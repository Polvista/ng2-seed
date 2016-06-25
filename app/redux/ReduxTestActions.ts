import {Injectable} from '@angular/core';
import {Action} from "../store/Action";


export class ReduxTestsActions {
    static INCREMENT = 'INCREMENT';
    static CHANGE_DATA = 'CHANGE_DATA';
    static INIT_PERF = 'INIT_PERF';

    static increment() {
        return {type: this.INCREMENT};
    }

    static changeData() {
        return {type: this.CHANGE_DATA};
    }

    static initPerf() {
        return {type: this.INIT_PERF};
    }
}

