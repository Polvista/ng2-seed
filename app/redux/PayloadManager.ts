import {action, useReturnValue} from "../store/managers/action";
import {ReduxTestsActions} from "./ReduxTestActions";

export class PayloadManager {

    @action(ReduxTestsActions.CHANGE_PAYLOAD)
    updatePayload(payload) {
        payload.updated = true;
    }
}