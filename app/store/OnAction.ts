export const ACTIONS_MAP_PROPERTY: string = '__ACTIONS_MAP__';

export function OnAction(actionType: string, useReturnValue = false) {

    console.log('on action');

    return (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
        if(!this[ACTIONS_MAP_PROPERTY]) {
            this[ACTIONS_MAP_PROPERTY] = {};
        }

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