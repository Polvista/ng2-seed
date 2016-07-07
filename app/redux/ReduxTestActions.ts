import {Injectable, Inject, forwardRef} from '@angular/core';
import {Action} from "../store/actions/Action";
import {Store} from "../store/Store";
import {ActionCreator} from "../store/actions/ActionCreator";
import {ActionTypeCreator} from "../store/actions/ActionTypeCreator";

@Injectable()
export class ReduxTestsActions extends ActionCreator {
    private static typeCreator = new ActionTypeCreator('REDUX_TEST');

    static INIT_COUNTER = ReduxTestsActions.typeCreator.type('INIT_COUNTER');
    static INCREMENT = ReduxTestsActions.typeCreator.type('INCREMENT');
    static CHANGE_DATA = ReduxTestsActions.typeCreator.type('CHANGE_DATA');
    static INIT_PERF = ReduxTestsActions.typeCreator.type('INIT_PERF');
    static ADD_NUM = ReduxTestsActions.typeCreator.type('ADD_NUM');
    static CLEAR = ReduxTestsActions.typeCreator.type('CLEAR');
    static SET_ITEM_PAYLOAD = ReduxTestsActions.typeCreator.type('SET_ITEM_PAYLOAD');
    static CLEAR_PAYLOAD = ReduxTestsActions.typeCreator.type('CLEAR_PAYLOAD');
    static CHANGE_ITEM = ReduxTestsActions.typeCreator.type('CHANGE_ITEM');
    static CHANGE_PAYLOAD = ReduxTestsActions.typeCreator.type('CHANGE_PAYLOAD');

    constructor(@Inject(forwardRef(() => Store)) store: Store){
        super(store);
    }

    init() {
        if(!this.store.getState().reduxTest) {
            this.dispatch(ReduxTestsActions.INIT_COUNTER);
        }
    }

    increment = () => this.dispatch(ReduxTestsActions.INCREMENT);

    changeData = () => this.dispatch(ReduxTestsActions.CHANGE_DATA);

    initPerf = () => this.dispatch(ReduxTestsActions.INIT_PERF);

    addNum = (num: number) => this.dispatch(ReduxTestsActions.ADD_NUM, num);

    setPayload = (id: number, payload) => this.dispatch(ReduxTestsActions.SET_ITEM_PAYLOAD, { id, payload });

    clearPayload = (id: number) => this.dispatch(ReduxTestsActions.CLEAR_PAYLOAD, { id });

    changeItem = (id: number) => this.dispatch(ReduxTestsActions.CHANGE_ITEM, {id});

    changePayload = (id: number) => this.dispatch(ReduxTestsActions.CHANGE_PAYLOAD, {id} );

    clear = () => this.dispatch(ReduxTestsActions.CLEAR);
}

