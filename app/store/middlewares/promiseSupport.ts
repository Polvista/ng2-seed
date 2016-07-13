import {isActionType} from "../actions/ActionType";
import {Action} from "../actions/Action";
import {PromiseActionType} from "../actions/PromiseActionType";
import {ActionType} from "../actions/ActionType";

export const promiseSupport = store => next => (action: Action) => {
    if(isActionType(action.type) && action.promise) {
        if(!(action.type instanceof PromiseActionType)) {
            throw new Error(`Action ${(<ActionType>action.type).asString()} must be instance of PromiseActionType. Use 'request' method of ActionTypeCreator to create one.`);
        }

        const actionType: PromiseActionType = <PromiseActionType> action.type;

        action.promise
            .then(result => store.dispatch({
                type: actionType.SUCCESS,
                payload: result
            }))
            .catch(error => store.dispatch({
                type: actionType.ERROR,
                payload: error
            }));

        delete action.promise;
    }

    return next(action);
};
