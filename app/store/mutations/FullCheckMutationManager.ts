import {MutationManager} from "./MutationManager";
import {AppState} from "../AppState";

export class Es5MutationManager extends MutationManager {
    private statePartsCache: WeakMap<any, any> = new WeakMap<any, any>();

    getMutableCopy(state: AppState): AppState {
        super.clearChanges();
        return this.getMutableCopyForObject(state, []);
    }

    private getMutableCopyForObject(object: any, path: string[]): any {
        if(this.statePartsCache.has(object)) {
            return this.statePartsCache.get(object);
        }

        const mutableCopy = Object.assign({}, object);
        Object.keys(mutableCopy).forEach((propName: string) => {
            if(this.isObject(mutableCopy[propName])) {
                mutableCopy[propName] = this.getMutableCopyForObject(mutableCopy[propName], [...path, propName]);
            }
        });

        this.statePartsCache.set(object, mutableCopy);

        return mutableCopy;
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

                    this.statePartsCache.delete(orig);
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

                        this.statePartsCache.delete(orig);
                    }
                } else if(typeOfMutatedObjValue === "[object Object]") {
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

                this.statePartsCache.delete(orig);
            }

        });

        if(origObjProperties.length) {
            this.statePartsCache.delete(orig);

            origObjProperties.forEach(origProperty => {
                //deleted property
                this.changes.push({
                    type: 'delete',
                    path: [...path, origProperty]
                });
            });
        }

    }
}