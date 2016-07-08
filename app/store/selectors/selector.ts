import { createSelector } from 'reselect';
import { AppState } from "./../AppState";
import { ReduxTestData } from "./../AppState";
const Immutable = require('seamless-immutable');

export function selector<Output>(...params: any[]): (state: AppState) => Output {
    if(params.length < 2) {
        throw new Error('Provide some information for selector!');
    }

    //Yeah, I know
    const createSelectorFix: (...params: any[]) => (state: AppState) => Output = createSelector;

    const selectorWithMemoization = <any> createSelectorFix(...params);
    const plainSelector = getPlainSelector<Output>(...params);

    return (state: AppState): Output => {
        if(Immutable.isImmutable(state)) {
            return selectorWithMemoization(state);
        } else {
            console.log('use plain selector');
            const result =  plainSelector(state);
            console.log('result: ', result);
            return result;
        }
    };
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

function getPlainSelector<Output>(...params: any[]): (state: AppState) => Output {
    const combiner = params.pop();

    return (state: AppState): Output => {
        const combinerParams: any[] = params.map(selector => selector(state));
        return combiner(...combinerParams);
    };
}
