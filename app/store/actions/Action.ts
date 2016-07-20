import {ActionType} from "./ActionType";

export interface Action {
    type: string | ActionType;
    promise?: Promise<any>;
    payload?: any;
}