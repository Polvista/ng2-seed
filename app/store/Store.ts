import { Injectable, Inject } from "@angular/core";
import { Observable } from 'rxjs';
import { Unsubscribe } from 'redux';
import { NgRedux } from 'ng2-redux';
import { Action } from "./Action";
import { AppState } from "./AppState";

@Injectable()
export class Store {
    ngRedux: any;
    constructor(/*@Inject('ngRedux') private ngRedux: NgRedux<AppState>*/) {
        this.ngRedux = {};
    }

    dispatch<A extends Action> (action: A) {
        return this.ngRedux.dispatch(action);
    }

    select<S>(selector: string | number | symbol | ((state: AppState) => S), comparer?: (x: any, y: any) => boolean): Observable<any> {  //TODO <any> or <S> ?
        return this.ngRedux.select(selector);
    }

    getState(): AppState {
        return this.ngRedux.getState();
    }

    subscribe(listener: () => void): Unsubscribe {
        return this.ngRedux.subscribe(listener);
    }
}