import {AppState} from "./AppState";
import {ReduxTestsActions} from "../redux/ReduxTestActions";
import {MutationManager} from "./mutations/MutationManager";
import {MutationManagerFactory} from "./mutations/MutationManagerFactory";
import {PerfUtils} from "./../redux/PerfUtils";
import {ReduxTestManager} from "../redux/ReduxTestManager";
import {Action} from "./actions/Action";
import {RootManager} from "./RootManager";
import {PARTS_MANAGERS_PROPERTY, InnerManagerDescription} from "./StateManager";
import {ACTIONS_MAP_PROPERTY, RETURN_VALUES_METHODS_PROPERTY} from "./OnAction";
import {ActionType, getActionTypeString} from "./actions/ActionType";

const rootManager: RootManager = new RootManager();

export let rootMutableReducer = (state: AppState, action: Action): AppState => {
    const mutationManager: MutationManager = MutationManagerFactory.getInstance();
    const mutableState: AppState = mutationManager.getMutableCopy(state);

    manageAction(mutableState, action, mutableState, rootManager, null, null);

    state = mutationManager.synchronizeState(state, mutableState);
    return state;
};

function manageAction(statePart: any, action: Action, state: AppState, manager: any, parentPart: any, propName: string) {
    let actionTypeString = getActionTypeString(action.type);

    if(manager[ACTIONS_MAP_PROPERTY] && manager[ACTIONS_MAP_PROPERTY][actionTypeString]) {
        manager[ACTIONS_MAP_PROPERTY][actionTypeString].forEach(( {handlerMethodName} ) => {
            const result = manager[handlerMethodName](statePart, action.payload, state);
            if(manager[RETURN_VALUES_METHODS_PROPERTY] && manager[RETURN_VALUES_METHODS_PROPERTY].indexOf(handlerMethodName) > -1) {
                parentPart[propName] = result;
            }
        });
    }

    if(typeof(statePart) !== "undefined" && statePart !== null) {
        const innerManagersDescriptions: InnerManagerDescription[] = manager[PARTS_MANAGERS_PROPERTY] || [];
        innerManagersDescriptions.forEach(description => {
            manageAction(statePart[description.selector], action, state, description.manager, statePart, description.selector);
        });
    }

}