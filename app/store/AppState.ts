export interface AppState {
    reduxTest?: ReduxTestData
}

export interface SomeData {
    id: number;
}

export interface ReduxTestData {
    initialized?: boolean;
    clicksCount?: number;
    someData?: SomeData;
    name?: string;
    justVal?: boolean;
    perf?: any;
}