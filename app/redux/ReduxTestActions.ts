import {Injectable, Inject, forwardRef} from '@angular/core';
import {Action} from "../store/Action";
import {Store} from "../store/Store";

@Injectable()
export class ReduxTestsActions {
    static INIT_COUNTER = 'INIT_COUNTER';
    static INCREMENT = 'INCREMENT';
    static CHANGE_DATA = 'CHANGE_DATA';
    static INIT_PERF = 'INIT_PERF';
    static ADD_NUM = 'ADD_NUM';

    constructor(@Inject(forwardRef(() => Store)) private store: Store){}

    init() {
        if(!this.store.getState().reduxTest.initialized) {
            this.store.dispatch({type: ReduxTestsActions.INIT_COUNTER});
        }
    }

    increment() {
        this.store.dispatch({type: ReduxTestsActions.INCREMENT});
    }

    changeData() {
        this.store.dispatch({type: ReduxTestsActions.CHANGE_DATA});
    }

    initPerf() {
        this.store.dispatch({type: ReduxTestsActions.INIT_PERF});
    }

    addNum(num: number) {
        this.store.dispatch({type: ReduxTestsActions.ADD_NUM, num});
    }
}

