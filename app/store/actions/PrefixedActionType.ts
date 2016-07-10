import {ActionType} from "./ActionType";

export class PrefixedActionType implements ActionType {
    private static DELIMITER = ' :: ';

    constructor(private prefix: string, private type: string) {}

    asString(): string {
        return this.prefix + PrefixedActionType.DELIMITER + this.type;
    }

}