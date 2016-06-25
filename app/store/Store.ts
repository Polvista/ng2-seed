import { Injectable, Inject, forwardRef, ApplicationRef } from "@angular/core";
import { Observable } from 'rxjs';
import { Unsubscribe } from 'redux';
import { NgRedux } from 'ng2-redux';
import { HmrState } from 'angular2-hmr';
import { Action } from "./Action";
import { AppState } from "./AppState";
import { rootMutableReducer } from './mutableReducer';

declare var window: Window & DevToolsExtension;

@Injectable()
export class Store {

    @HmrState()
    private ngRedux: NgRedux<AppState>;

    constructor(public applicationRef: ApplicationRef) {

        if(process.env.ENV === 'development') {
            if(this.ngRedux) {
                this.ngRedux.subscribe(() => applicationRef.tick());
                return;
            }

            this.configureStore();
            this.ngRedux.subscribe(() => applicationRef.tick());
            return;
        }

        this.configureStore();
    }

    private configureStore() {
        this.ngRedux = new NgRedux();

        const middleware = [];
        let enhancers = [];

        //enable in prod?
        if (process.env.ENV === 'development' && window && window.devToolsExtension) {
            enhancers = [...enhancers, window.devToolsExtension()];
        }

        const Immutable = require('seamless-immutable');
        const initialState: AppState = Immutable({
            clicksCount: 0,
            name: '123',
            someData: {
                id: 44
            }
        });

        this.ngRedux.configureStore(rootMutableReducer, initialState, middleware, enhancers);
    }

    dispatch<A extends Action> (action: A) {
        return this.ngRedux.dispatch(action);
    }

    select<S>(selector: string | number | symbol | (string | number)[] | ((s: AppState) => S), comparer?: (x: any, y: any) => boolean): Observable<any> {  //TODO <any> or <S> ?
        return this.ngRedux.select(selector);
    }

    getState(): AppState {
        return this.ngRedux.getState();
    }

    subscribe(listener: () => void): Unsubscribe {
        return this.ngRedux.subscribe(listener);
    }
}