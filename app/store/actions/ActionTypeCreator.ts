import {PrefixedActionType} from "./PrefixedActionType";

export class ActionTypeCreator {

    constructor(private prefix: string) {}

    type(type: string): PrefixedActionType {
        return new PrefixedActionType(this.prefix, type);
    }

}