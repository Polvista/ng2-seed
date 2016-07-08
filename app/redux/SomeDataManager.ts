import {OnAction, UseReturnValue} from "../store/managers/OnAction";
import {ReduxTestsActions} from "./ReduxTestActions";
import {SomeData} from "../store/AppState";
import { StateManager } from "../store/managers/StateManager";
import {PayloadManager} from "./PayloadManager";

export class SomeDataManager {

    @StateManager('payload')
    payloadManager = new PayloadManager();

    @OnAction(ReduxTestsActions.SET_ITEM_PAYLOAD)
    setPayload(someData: SomeData, { payload }) {
        someData.payload = payload;
    }


    @OnAction(ReduxTestsActions.CLEAR_PAYLOAD)
    clearPayload(someData: SomeData) {
        someData.payload = null;
    }

    @UseReturnValue()
    @OnAction(ReduxTestsActions.CHANGE_ITEM)
    changeItem(someData: SomeData): SomeData {
        return {
            id: someData.id,
            payload: 'changed'
        }
    }

}