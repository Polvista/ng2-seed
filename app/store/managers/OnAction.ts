import {ActionType, getActionTypeString} from "./../actions/ActionType";
export const ACTIONS_MAP_PROPERTY: string = '__ACTIONS_MAP';
export const RETURN_VALUES_METHODS_PROPERTY: string = '__RETURN_VALUES_METHODS';

export function OnAction(...actionTypes: (string | ActionType)[]) {

    return (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
        if(!target[ACTIONS_MAP_PROPERTY]) {
            Object.defineProperty(target, ACTIONS_MAP_PROPERTY, {
                enumerable: false,
                configurable: false,
                writable: false,
                value: {}
            });
        }

        actionTypes.forEach(actionType => {
            let actionTypeString = getActionTypeString(actionType);

            if(!target[ACTIONS_MAP_PROPERTY][actionTypeString]) {
                target[ACTIONS_MAP_PROPERTY][actionTypeString] = [];
            }

            target[ACTIONS_MAP_PROPERTY][actionTypeString].push({
                handlerMethodName: propertyKey
            });
        });

        return descriptor;

    }

}

export function UseReturnValue() {

    return (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
        if(!target[RETURN_VALUES_METHODS_PROPERTY]) {
            Object.defineProperty(target, RETURN_VALUES_METHODS_PROPERTY, {
                enumerable: false,
                configurable: false,
                writable: false,
                value: []
            });
        }

        target[RETURN_VALUES_METHODS_PROPERTY].push(propertyKey);

        return descriptor;
    }

}