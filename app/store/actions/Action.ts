import {ActionType} from "./ActionType";

export interface Action {
    type: string | ActionType;
    payload?: any;
}