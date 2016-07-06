import {OnAction, UseReturnValue} from "../store/OnAction";
import {ReduxTestsActions} from "./ReduxTestActions";

export class PayloadManager {

    @OnAction(ReduxTestsActions.CHANGE_PAYLOAD)
    updatePayload(payload) {
        payload.updated = true;
    }
}