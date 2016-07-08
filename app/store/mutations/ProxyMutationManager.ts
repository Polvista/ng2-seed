import {MutationManager} from "./MutationManager";
import {AppState} from "../AppState";
import {Immutable} from "./MutationManager";


class ChangeWatcher {
    private subscribers: (() => void)[] = [];

    subscribe(subscriber: () => void) {
        this.subscribers.push(subscriber);
    }

    notifyAboutChange() {
        if(this.subscribers) {
            this.subscribers.forEach(subscriber => subscriber());
            this.subscribers = null; //End of lifecycle
        }
    }

}

const CHANGE_WATCHER_PROPERTY = '__CHANGE_WATCHER';

export class ProxyMutationManager extends MutationManager {

    getMutableCopy(state: AppState): AppState {
        super.clearChanges();

        if(!this.isObject(state)) {
            throw new Error('state must be an object');
        }

        return this.getMutableCopyForObject(state, []);
    }

    private getMutableCopyForObject(object: any, path: string[]): any {
        if(this.objectsCache.hasObject(object)) {
            return this.objectsCache.getValue(object);
        }

        let mutableCopy;
        const changeWatcher = new ChangeWatcher();
        if(this.isObject(object)) {
            mutableCopy = {};
            Object.keys(object).forEach((propName: string) => {
                mutableCopy[propName] = this.getMutableCopyForObjectProperty(object[propName], propName, path, changeWatcher, object);
            });
        } else if(this.isArray(object)) {
            mutableCopy = [];
            for(let i = 0; i < object.length; i++) {
                mutableCopy[i] = this.getMutableCopyForObjectProperty(object[i], i.toString(), path, changeWatcher, object);
            }
        } else {
            throw new Error('State must contain only objects and arrays');
        }

        Object.defineProperty(mutableCopy, CHANGE_WATCHER_PROPERTY, {
            enumerable: false,
            configurable: false,
            writable: false,
            value: changeWatcher
        });

        const mutableCopyProxy = new Proxy(mutableCopy, this.createMutationHandler(path, object));
        this.objectsCache.saveObject(object, mutableCopyProxy);

        return mutableCopyProxy;
    }

    private getMutableCopyForObjectProperty(property, propertyName: string, path: string[], changeWatcher: ChangeWatcher, immutableOrigObj) {
        if(this.isObject(property) || this.isArray(property)) {
            const mutableInnerObject = this.getMutableCopyForObject(property, [...path, propertyName]);

            mutableInnerObject[CHANGE_WATCHER_PROPERTY].subscribe(() => {
                this.invalidateCacheForObject(immutableOrigObj);
                changeWatcher.notifyAboutChange();
            });

            return mutableInnerObject;
        }

        return property;
    }

    private invalidateCacheForObject(object) {
        this.objectsCache.deleteObject(object);
    }

    private createMutationHandler(path, immutableOriginalObject) {
        const manager = this;

        return {
            set(target, name: string, val) {
                manager.changes.push({
                    type: 'update',
                    path: [...path, name],
                    val
                });

                target[CHANGE_WATCHER_PROPERTY].notifyAboutChange();
                manager.invalidateCacheForObject(immutableOriginalObject);

                target[name] = val;
                return true;
            },

            deleteProperty(target, name: string) {
                manager.changes.push({
                    type: 'delete',
                    path: [...path, name]
                });

                target[CHANGE_WATCHER_PROPERTY].notifyAboutChange();
                manager.invalidateCacheForObject(immutableOriginalObject);

                return true;
            }
        }
    }

    synchronizeState(state: AppState, mutatedState: AppState): AppState {
        return super.applyChangesToState(state);
    }


}

