import {PrefixedActionType} from "./PrefixedActionType";
import {PromiseActionType} from "./PromiseActionType";

export class ActionTypeCreator {

    constructor(private prefix: string) {}

    type(type: string): PrefixedActionType {
        return new PrefixedActionType(this.prefix, type);
    }

    request(type: string): PromiseActionType {
        return new PromiseActionType(this.prefix, type);
    }

}