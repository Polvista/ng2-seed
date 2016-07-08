import {AppState} from "./../AppState";
import {StateObjectsCache} from "./stateObjectsCache/StateObjectsCache";
import {StateObjectCacheFactory} from "./stateObjectsCache/StateObjectCacheFactory";

interface Patch {
    type: string;
    path: string[];
    val?: any;
}

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

export abstract class MutationManager {
    protected static CHANGE_WATCHER_PROPERTY = "__CHANGE_WATCHER";
    protected objectsCache: StateObjectsCache;
    protected changes: Patch[];

    constructor() {
        this.objectsCache = StateObjectCacheFactory.getObjectsCache();
    }

    getMutableCopy(state: AppState): AppState {
        this.clearChanges();

        if(!this.isObject(state)) {
            throw new Error('state must be an object');
        }

        return this.getMutableCopyForObject(state, []);
    }

    abstract synchronizeState(state: AppState, mutatedState: AppState): AppState;
    protected abstract enhanceMutableObject(mutableObject: any, origObject: any, path: string[]): any;

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

        Object.defineProperty(mutableCopy, MutationManager.CHANGE_WATCHER_PROPERTY, {
            enumerable: false,
            configurable: false,
            writable: false,
            value: changeWatcher
        });

        const mutableObjectEnhanced = this.enhanceMutableObject(mutableCopy, object, path);
        this.objectsCache.saveObject(object, mutableObjectEnhanced);

        return mutableObjectEnhanced;
    }

    private getMutableCopyForObjectProperty(property, propertyName: string, path: string[], changeWatcher: ChangeWatcher, immutableOrigObj) {
        if(this.isObject(property) || this.isArray(property)) {
            const mutableInnerObject = this.getMutableCopyForObject(property, [...path, propertyName]);

            mutableInnerObject[MutationManager.CHANGE_WATCHER_PROPERTY].subscribe(() => {
                this.invalidateCacheForObject(immutableOrigObj);
                changeWatcher.notifyAboutChange();
            });

            return mutableInnerObject;
        }

        return property;
    }

    protected invalidateCacheForObject(object) {
        this.objectsCache.deleteObject(object);
    }

    protected clearChanges() {
        this.changes = [];
    }

    protected isObject(target): boolean {
        return Object.prototype.toString.call(target) === "[object Object]";
    }

    protected isArray(target): boolean {
        return Object.prototype.toString.call(target) === '[object Array]';
    }

    protected applyChangesToState(state: AppState): AppState {
        this.changes.forEach(patch => {
            const nextVal = patch.type == 'update' ? patch.val : null;
            state = (<Immutable> state).setIn(patch.path, nextVal);
        });

        return state;
    }

}

export interface Immutable {
    setIn: (path: string[], value: any) => any
}