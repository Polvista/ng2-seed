export const PARTS_MANAGERS_PROPERTY: string = '__PARTS_MANAGERS__';

export interface InnerManagerDescription {
    selector: string;
    manager: any;
    initialValue: any;
}

export function StateManager(selector: string, initialValue: any = {}) {

    return (target: any, key: string) => {
        function setter(manager) {
            if(!this[PARTS_MANAGERS_PROPERTY]) {
                this[PARTS_MANAGERS_PROPERTY] = [];
            }

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
        }

    }
}