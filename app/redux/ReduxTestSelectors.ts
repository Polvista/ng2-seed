import { AppState } from "../store/AppState";
import { selector } from '../store/selector';

export class ReduxTestSelectors {

    static clicksCount = selector<number>((state: AppState) => state.reduxTest.clicksCount);

    static clicksAndIds = selector<number>(
        ReduxTestSelectors.clicksCount,
        (state: AppState) => state.reduxTest.someData.id,
        (clicksCount, id) => clicksCount + id
    );

}