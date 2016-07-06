export const ARRAY_ITEM_MANAGERS_PROPERTY: string = '__ARRAY_ITEM_MANAGERS';

export interface ArrayItemManagerDescription {
    propertySelector: string;
    manager: any;
    itemSelector: ItemSelector;
}

export interface ItemSelector {
    (item, payload?, actionTypeString?: string): boolean;
}

export function ArrayItemManager(propertySelector: string, itemSelector: ItemSelector) {

    return (target: any, key: string) => {
        function setter(manager) {
            if(!this[ARRAY_ITEM_MANAGERS_PROPERTY]) {
                Object.defineProperty(this, ARRAY_ITEM_MANAGERS_PROPERTY, {
                    enumerable: false,
                    configurable: false,
                    writable: false,
                    value: []
                });
            }

            const managerDescription: ArrayItemManagerDescription = {
                propertySelector,
                manager,
                itemSelector
            };

            this[ARRAY_ITEM_MANAGERS_PROPERTY].push(managerDescription);
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