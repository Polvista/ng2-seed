import {isActionType} from "../actions/ActionType";

export const actionTypesSupport = store => next => action => {
    const currentType = action.type;
    if(isActionType(currentType)) {
        action.type = currentType.asString();
    }

    return next(action);
};