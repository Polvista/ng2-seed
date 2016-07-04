export interface ActionType {

    asString: () => string;

}

export function isActionType(object: any): object is ActionType {
    return 'asString' in object;
}

export function getActionTypeString(actionType: string | ActionType): string {
    if(typeof actionType === "string") {
        return actionType;
    } else if(isActionType(actionType)) {
        return actionType.asString();
    } else {
        throw new Error(`Unsupported action type: ${actionType}`);
    }
}