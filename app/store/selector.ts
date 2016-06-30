import { createSelector } from 'reselect';
import { AppState } from "./AppState";

export function selector<Output>(...params: any[]): (state: AppState) => Output {
    if(params.length < 2) {
        throw new Error('Provide some information for selector!');
    }

    //Yeah, I know
    const createSelectorFix: (...params: any[]) => (state: AppState) => Output = createSelector;

    return <any> createSelectorFix(...params);
}
