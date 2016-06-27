export interface AppState {
    reduxTest?: ReduxTestData
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