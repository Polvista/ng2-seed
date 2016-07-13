import {ActionType} from "./ActionType";
import {PrefixedActionType} from "./PrefixedActionType";

export class PromiseActionType implements ActionType {
    private static SUCCESS_POSTFIX = '_SUCCESS';
    private static ERROR_POSTFIX = '_ERROR';
    private LOADING: PrefixedActionType;

    SUCCESS: PrefixedActionType;
    ERROR: PrefixedActionType;

    constructor(prefix: string, type: string) {
        this.LOADING = new PrefixedActionType(prefix, type);
        this.SUCCESS = new PrefixedActionType(prefix, type + PromiseActionType.SUCCESS_POSTFIX);
        this.ERROR = new PrefixedActionType(prefix, type + PromiseActionType.ERROR_POSTFIX);
    }

    asString(): string {
        return this.LOADING.asString();
    }

}