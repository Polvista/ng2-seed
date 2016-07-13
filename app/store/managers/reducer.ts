export const REDUCERS_PROPERTY: string = '__REDUCERS';

export interface ReducerDescription {
    selector: string;
    reducer: any;
    actionMapper: ActionMapper;
}

interface ActionMapper {
    (action: any): any;
}

export function reducer(selector: string, actionMapper?: ActionMapper) {

    return (target: any, key: string) => {
        let statePartReducer;

        function setter(reducer) {
            if(!target[REDUCERS_PROPERTY]) {
                Object.defineProperty(target, REDUCERS_PROPERTY, {
                    enumerable: false,
                    configurable: false,
                    writable: false,
                    value: []
                });
            }

            target[REDUCERS_PROPERTY].push({
                selector,
                reducer,
                actionMapper: actionMapper ? actionMapper : action => action
            });

            statePartReducer = reducer;
        }

        function getter(){
            return statePartReducer;
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