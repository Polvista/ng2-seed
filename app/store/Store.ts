import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { NgRedux } from 'ng2-redux';
import { Action } from "./Action";
import { AppState } from "./AppState";

@Injectable()
export class Store {
    constructor(private ngRedux: NgRedux<AppState>) {
    }

    dispatch<A extends Action> (action: A) {
        return this.ngRedux.dispatch(<any> action);
    }

    select<S>(selector: string | number | symbol | ((state: AppState) => S), comparer?: (x: any, y: any) => boolean): Observable<any> {  //TODO <any> or <S> ?
        return this.ngRedux.select(selector);
    }

    getState(): AppState {
        return this.ngRedux.getState();
    }
}