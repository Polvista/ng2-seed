import {Injectable, Inject, forwardRef} from '@angular/core';
import {Store} from "./../Store";
import {ActionType} from "./ActionType";

@Injectable()
export class ActionCreator {

    constructor(protected  store: Store){}

    dispatch(actionType: string | ActionType, payload?: any) {
        this.store.dispatch({
            type: actionType,
            payload
        });
    }

}