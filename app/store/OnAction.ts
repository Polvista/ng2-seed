export const ACTIONS_MAP_PROPERTY: string = '__ACTIONS_MAP__';

export function OnAction(actionType: string, useReturnValue = false) {

    return (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
        if(!target[ACTIONS_MAP_PROPERTY]) {
            target[ACTIONS_MAP_PROPERTY] = {};
        }

        target[ACTIONS_MAP_PROPERTY][actionType] = {
            actionHandler: target[propertyKey],
            useReturnValue
        };

        return descriptor;

        /*function setter(manager) {


            this[PARTS_MANAGERS_PROPERTY].push({
                selector,
                manager,
                initialValue
            });
        }

        if (delete this[key]) {
            Object.defineProperty(target, key, {
                set: setter,
                enumerable: true,
                configurable: true
            });
        }*/

    }

};