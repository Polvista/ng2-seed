import { createSelector } from 'reselect';
import { AppState } from "./AppState";
import {ReduxTestData} from "./AppState";

export function selector<Output>(...params: any[]): (state: AppState) => Output {
    if(params.length < 2) {
        throw new Error('Provide some information for selector!');
    }

    //Yeah, I know
    const createSelectorFix: (...params: any[]) => (state: AppState) => Output = createSelector;

    return <any> createSelectorFix(...params);
}

export function nullSafeSelector<Output>(...params: any[]): (state: AppState) => Output {
    const combiner = params.pop();
    params.push(nullSafe(combiner));

    return selector<Output>(...params);
}

export function nullSafe(func: Function) {
    return (...args: any[]) => {
        for(let i = 0; i < args.length; i++) {
            if(typeof(args[i]) === "undefined" || args[i] === null) {
                return null;
            }
        }

        return func(...args);
    }
}
