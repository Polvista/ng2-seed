import {MutationManager} from "./MutationManager";
import {AppState} from "../AppState";

export class DirtyCheckMutationManager extends MutationManager {

    getMutableCopy(state: AppState): AppState {
        super.clearChanges();
        return this.getMutableCopyForObject(state, []);
    }

    private getMutableCopyForObject(object: any, path: string[]): any {
        if(this.objectsCache.hasObject(object)) {
            return this.objectsCache.getValue(object);
        }

        let mutableCopy;
        if(this.isObject(object)) {
            mutableCopy = {};
            Object.keys(object).forEach((propName: string) => {
                mutableCopy[propName] = this.getMutableCopyForObjectProperty(object[propName], propName, path);
            });
        } else if(this.isArray(object)) {
            mutableCopy = [];
            for(let i = 0; i < object.length; i++) {
                mutableCopy[i] = this.getMutableCopyForObjectProperty(object[i], i.toString(), path);
            }
        } else {
            throw new Error('State must contain only objects and arrays');
        }

        this.objectsCache.saveObject(object, mutableCopy);

        return mutableCopy;
    }

    private getMutableCopyForObjectProperty(property, propertyName: string, path: string[]) {
        if(this.isObject(property) || this.isArray(property)) {
            return this.getMutableCopyForObject(property, [...path, propertyName]);
        }

        return property;
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

                    this.objectsCache.deleteObject(orig);
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

                        this.objectsCache.deleteObject(orig);
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

                this.objectsCache.deleteObject(orig);
            }

        });

        if(origObjProperties.length) {
            this.objectsCache.deleteObject(orig);

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