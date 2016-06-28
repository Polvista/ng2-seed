import {MutationManager} from "./MutationManager";
import {AppState} from "../AppState";
import {Immutable} from "./MutationManager";

export class ProxyMutationManager extends MutationManager {
    private statePartsCache: WeakMap<any, any> = new WeakMap<any, any>(); //TODO delete unused objects

    getMutableCopy(state: AppState): AppState {
        super.clearChanges();

        if(!this.isObject(state)) {
            throw new Error('state must be an object');
        }

        return this.getMutableCopyForObject(state, [], []);
    }

    private getMutableCopyForObject(object: any, path: string[], relatedObjects: any[]): any {
        if(this.statePartsCache.has(object)) {
            return this.statePartsCache.get(object);
        }

        const mutableCopy = Object.assign({}, object);
        Object.keys(mutableCopy).forEach((propName: string) => {
            if(this.isObject(mutableCopy[propName])) {
                mutableCopy[propName] = this.getMutableCopyForObject(mutableCopy[propName], [...path, propName], [...relatedObjects, object]);
            }
        });

        const mutableCopyProxy = new Proxy(mutableCopy, this.createMutationHandler(path, [...relatedObjects, object]));
        this.statePartsCache.set(object, mutableCopyProxy);

        return mutableCopyProxy;
    }

    private createMutationHandler(path, relatedObjects) {
        const manager = this;

        return {
            set(target, name: string, val) {
                manager.changes.push({
                    type: 'update',
                    path: [...path, name],
                    val
                });

                relatedObjects.forEach(relatedObject => manager.statePartsCache.delete(relatedObject));

                target[name] = val;
                return true;
            },

            deleteProperty(target, name: string) {
                manager.changes.push({
                    type: 'delete',
                    path: [...path, name]
                });

                relatedObjects.forEach(relatedObject => manager.statePartsCache.delete(relatedObject));

                return true;
            }
        }
    }

    synchronizeState(state: AppState, mutatedState: AppState): AppState {
        return super.applyChangesToState(state);
    }


}
