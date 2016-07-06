import {AppState} from "./../AppState";

interface Patch {
    type: string;
    path: string[];
    val?: any;
}

export abstract class MutationManager {
    protected changes: Patch[];

    abstract getMutableCopy(state: AppState): AppState;
    abstract synchronizeState(state: AppState, mutatedState: AppState): AppState;

    protected clearChanges() {
        this.changes = [];
    }

    protected isObject(target): boolean {
        return Object.prototype.toString.call(target) === "[object Object]";
    }

    protected isArray(target): boolean {
        return Object.prototype.toString.call(target) === '[object Array]';
    }

    applyChangesToState(state: AppState): AppState {
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