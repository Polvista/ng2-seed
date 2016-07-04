import {Injectable, Inject, forwardRef} from '@angular/core';
import {Action} from "../store/Action";
import {Store} from "../store/Store";
import {ActionCreator} from "../store/ActionCreator";

@Injectable()
export class ReduxTestsActions extends ActionCreator {
    static INIT_COUNTER = 'INIT_COUNTER';
    static INCREMENT = 'INCREMENT';
    static CHANGE_DATA = 'CHANGE_DATA';
    static INIT_PERF = 'INIT_PERF';
    static ADD_NUM = 'ADD_NUM';

    constructor(@Inject(forwardRef(() => Store)) store: Store){
        super(store);
    }

    init() {
        if(!this.store.getState().reduxTest) {
            this.dispatch(ReduxTestsActions.INIT_COUNTER);
        }
    }

    increment() {
        this.dispatch(ReduxTestsActions.INCREMENT);
    }

    changeData() {
        this.dispatch(ReduxTestsActions.CHANGE_DATA);
    }

    initPerf() {
        this.dispatch(ReduxTestsActions.INIT_PERF);
    }

    addNum(num: number) {
        this.dispatch(ReduxTestsActions.ADD_NUM, num);
    }
}

