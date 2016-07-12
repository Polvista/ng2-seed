export const PARTS_MANAGERS_PROPERTY: string = '__PARTS_MANAGERS';

export interface InnerManagerDescription {
    selector: string;
    manager: any;
    initialValue: any;
}

export function manager(selector: string) {

    return (target: any, key: string) => {
        let stateManager;

        function setter(manager) {
            if(!target[PARTS_MANAGERS_PROPERTY]) {
                Object.defineProperty(target, PARTS_MANAGERS_PROPERTY, {
                    enumerable: false,
                    configurable: false,
                    writable: false,
                    value: []
                });
            }

            target[PARTS_MANAGERS_PROPERTY].push({
                selector,
                manager
            });

            stateManager = manager;
        }

        function getter(){
            return stateManager;
        }

        if (delete target[key]) {
            Object.defineProperty(target, key, {
                get: getter,
                set: setter,
                enumerable: true,
                configurable: true
            });
        }

    }
}