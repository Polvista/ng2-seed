import {action, useReturnValue} from "../store/managers/OnAction";
import {ReduxTestsActions} from "./ReduxTestActions";
import {SomeData} from "../store/AppState";
import { stateManager } from "../store/managers/StateManager";
import {PayloadManager} from "./PayloadManager";

export class SomeDataManager {

    @stateManager('payload')
    payloadManager = new PayloadManager();

    @action(ReduxTestsActions.SET_ITEM_PAYLOAD)
    setPayload(someData: SomeData, { payload }) {
        someData.payload = payload;
    }


    @action(ReduxTestsActions.CLEAR_PAYLOAD)
    clearPayload(someData: SomeData) {
        someData.payload = null;
    }

    @useReturnValue()
    @action(ReduxTestsActions.CHANGE_ITEM)
    changeItem(someData: SomeData): SomeData {
        return {
            id: someData.id,
            payload: 'changed'
        }
    }

}