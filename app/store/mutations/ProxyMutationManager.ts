import {MutationManager} from "./MutationManager";
import {AppState} from "../AppState";
import {Immutable} from "./MutationManager";


export class ProxyMutationManager extends MutationManager {

    protected enhanceMutableObject(mutableObject: any, origObject: any, path: string[]): any {
        return new Proxy(mutableObject, this.createMutationHandler(path, origObject));
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

                target[MutationManager.CHANGE_WATCHER_PROPERTY].notifyAboutChange();
                manager.invalidateCacheForObject(immutableOriginalObject);

                target[name] = val;
                return true;
            },

            deleteProperty(target, name: string) {
                manager.changes.push({
                    type: 'delete',
                    path: [...path, name]
                });

                target[MutationManager.CHANGE_WATCHER_PROPERTY].notifyAboutChange();
                manager.invalidateCacheForObject(immutableOriginalObject);

                return true;
            }
        }
    }

    synchronizeState(state: AppState, mutatedState: AppState): AppState {
        return super.applyChangesToState(state);
    }


}

