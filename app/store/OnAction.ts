export const ACTIONS_MAP_PROPERTY: string = '__ACTIONS_MAP__';
export const RETURN_VALUES_METHODS_PROPERTY: string = '__RETURN_VALUES_METHODS__';

export function OnAction(...actionTypes: string[]) {

    return (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
        if(!target[ACTIONS_MAP_PROPERTY]) {
            target[ACTIONS_MAP_PROPERTY] = {};
        }

        actionTypes.forEach(actionType => {
            if(!target[ACTIONS_MAP_PROPERTY][actionType]) {
                target[ACTIONS_MAP_PROPERTY][actionType] = [];
            }

            target[ACTIONS_MAP_PROPERTY][actionType].push({
                handlerMethodName: propertyKey
            });
        });

        return descriptor;

    }

}

export function UseReturnValue() {

    return (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
        if(!target[RETURN_VALUES_METHODS_PROPERTY]) {
            target[RETURN_VALUES_METHODS_PROPERTY] = [];
        }

        target[RETURN_VALUES_METHODS_PROPERTY].push(propertyKey);

        return descriptor;
    }

}