//import { createSelector } from 'reselect';
import { AppState } from "./AppState";

export function selector<Output>(...params: any[]): (state: AppState) => Output {
    if(!params.length) {
        throw new Error('Provide some information for selector!');
    } /*else if(params.length == 1) {
        params.unshift(state => state);
    }

    return <any> createSelector(params);*/

    return (state: AppState): Output => {
        const combiner: (...data: any[]) => Output = params[params.length - 1];
        const combinerData = [];

        if(params.length == 1) {
            combinerData.push(state);
        } else {
            params.slice(0, -1).forEach(selector => combinerData.push(selector(state)));
        }

        return combiner(...combinerData);
    };
}
