import {Action} from "../store/Action";

export class ReduxTestsActions {
    static INCREMENT = 'INCREMENT';
    static CHANGE_DATA = 'CHANGE_DATA';

    static increment() {
        return {type: this.INCREMENT};
    }

    static changeData() {
        return {type: this.CHANGE_DATA};
    }
}

