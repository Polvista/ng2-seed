import {Injectable, Inject, forwardRef} from '@angular/core';
import {Store} from "./../Store";
import {ActionType} from "./ActionType";
import {AppState} from "../AppState";

@Injectable()
export class ActionCreator {

    constructor(protected  store: Store){}

    dispatch(actionType: string | ActionType, payload?: any) {
        this.store.dispatch({
            type: actionType,
            payload
        });
    }

    dispatchRequest(actionType: string | ActionType, promise: Promise<any>, payload?: any): Promise<any>  {
        this.store.dispatch({
            type: actionType,
            promise,
            payload
        });
        return promise;
    }

    getState(): AppState {
        return this.store.getState();
    }

}