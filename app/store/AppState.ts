import {AppRoute} from "../routes/AppRoute";

export interface AppState {
    reduxTest?: ReduxTestData;
    route?: AppRoute;
}

export interface SomeData {
    id: number;
}

export interface ReduxTestData {
    clicksCount?: number;
    someData?: SomeData;
    name?: string;
    justVal?: boolean;
    perf?: any;
}