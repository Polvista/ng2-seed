import {Injectable, Inject, forwardRef} from '@angular/core';
import {Store} from "./Store";

@Injectable()
export class ActionCreator {

    constructor(protected  store: Store){}

    dispatch(actionType: string, payload?: any) {
        this.store.dispatch({
            type: actionType,
            payload
        });
    }

}