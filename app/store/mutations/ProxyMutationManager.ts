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
    private statePartsCache: WeakMap<any, any> = new WeakMap<any, any>();

    getMutableCopy(state: AppState): AppState {
        super.clearChanges();

        if(!this.isObject(state)) {
            throw new Error('state must be an object');
        }

        return this.getMutableCopyForObject(state, []);
    }

    private getMutableCopyForObject(object: any, path: string[]): any {
        if(this.statePartsCache.has(object)) {
            return this.statePartsCache.get(object);
        }

        const mutableCopy = Object.assign({}, object);
        const changeWatcher = new ChangeWatcher();
        Object.keys(mutableCopy).forEach((propName: string) => {
            if(this.isObject(mutableCopy[propName])) {
                const mutableInnerObject = this.getMutableCopyForObject(mutableCopy[propName], [...path, propName]);

                mutableInnerObject[CHANGE_WATCHER_PROPERTY].subscribe(() => {
                    this.invalidateCacheForObject(object);
                    changeWatcher.notifyAboutChange();
                });

                mutableCopy[propName] = mutableInnerObject;
            }
        });

        Object.defineProperty(mutableCopy, CHANGE_WATCHER_PROPERTY, {
            enumerable: false,
            configurable: false,
            writable: false,
            value: changeWatcher
        });

        const mutableCopyProxy = new Proxy(mutableCopy, this.createMutationHandler(path, object));
        this.statePartsCache.set(object, mutableCopyProxy);

        return mutableCopyProxy;
    }

    private invalidateCacheForObject(object) {
        this.statePartsCache.delete(object);
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

