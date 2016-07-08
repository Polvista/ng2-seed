import {MutationManager} from "./MutationManager";
import {AppState} from "../AppState";

export class DirtyCheckMutationManager extends MutationManager {

    protected enhanceMutableObject(mutableObject: any, origObject: any, path: string[]): any {
        return mutableObject;
    }

    synchronizeState(state: AppState, mutatedState: AppState): AppState {
        this.findChangesForObjects(state, mutatedState, []);
        return this.applyChangesToState(state);
    }

    private findChangesForObjects(orig, mutated, path) {

        let origObjProperties: string[] = Object.keys(orig);
        let mutatedObjProperties: string[] = Object.keys(mutated);

        mutatedObjProperties.forEach((mutatedObjProperty: string) => {
            const origPropIndex: number = origObjProperties.indexOf(mutatedObjProperty);

            if(origPropIndex > -1) {

                const mutatedObjValue = mutated[mutatedObjProperty];
                const origObjValue = orig[mutatedObjProperty];

                const typeOfMutatedObjValue = Object.prototype.toString.call(mutatedObjValue);
                const typeOfOrigObjValue = Object.prototype.toString.call(origObjValue);

                if(typeOfMutatedObjValue !== typeOfOrigObjValue) {
                    //value update
                    this.changes.push({
                        type: 'update',
                        path: [...path, mutatedObjProperty],
                        val: mutatedObjValue
                    });

                    this.clearCacheForObject(orig, mutated);
                } else if(typeOfMutatedObjValue === "[object String]" ||
                          typeOfMutatedObjValue === "[object Number]" ||
                          typeOfMutatedObjValue === "[object Boolean]") {

                    if(mutatedObjValue != origObjValue) {
                        //value update
                        this.changes.push({
                            type: 'update',
                            path: [...path, mutatedObjProperty],
                            val: mutatedObjValue
                        });

                        this.clearCacheForObject(orig, mutated);
                    }
                } else if(typeOfMutatedObjValue === "[object Object]" || typeOfMutatedObjValue === "[object Array]") {
                    this.findChangesForObjects(origObjValue, mutatedObjValue, [...path, mutatedObjProperty]);
                }

                origObjProperties.splice(origPropIndex, 1);
            } else {
                //new property
                this.changes.push({
                    type: 'update',
                    path: [...path, mutatedObjProperty],
                    val: mutated[mutatedObjProperty]
                });

                this.clearCacheForObject(orig, mutated);
            }

        });

        if(origObjProperties.length) {
            this.clearCacheForObject(orig, mutated);

            origObjProperties.forEach(origProperty => {
                //deleted property
                this.changes.push({
                    type: 'delete',
                    path: [...path, origProperty]
                });
            });
        }

    }

    private clearCacheForObject(orig:any, mutated: any) {
        if(mutated[MutationManager.CHANGE_WATCHER_PROPERTY]) {
            mutated[MutationManager.CHANGE_WATCHER_PROPERTY].notifyAboutChange();
        } else {
            //new object setted, take old one and notify parents about change
            this.objectsCache.getValue(orig)[MutationManager.CHANGE_WATCHER_PROPERTY].notifyAboutChange();
        }

        this.invalidateCacheForObject(orig);
    }
}