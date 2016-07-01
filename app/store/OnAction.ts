export const ACTIONS_MAP_PROPERTY: string = '__ACTIONS_MAP__';

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