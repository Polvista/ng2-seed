import {AppState} from "./AppState";
import {ReduxTestsActions} from "../redux/ReduxTestActions";
import {MutationManager} from "./mutations/MutationManager";
import {MutationManagerFactory} from "./mutations/MutationManagerFactory";
import {PerfUtils} from "./../redux/PerfUtils";
import {ReduxTestManager} from "../redux/ReduxTestManager";
import {Action} from "./actions/Action";
import {RootManager} from "./RootManager";
import {PARTS_MANAGERS_PROPERTY, InnerManagerDescription} from "./managers/manager";
import {ACTIONS_MAP_PROPERTY, RETURN_VALUES_METHODS_PROPERTY} from "./managers/action";
import {ActionType, getActionTypeString} from "./actions/ActionType";
import {ArrayItemManagerDescription, ARRAY_ITEM_MANAGERS_PROPERTY} from "./managers/arrayItemManager";
import {REDUCERS_PROPERTY, ReducerDescription} from "./managers/reducer";

const rootManager: RootManager = new RootManager();

interface UpdateParentCallback {
    (newValue: any): void;
}

export let rootMutableReducer = (state: AppState, action: Action): AppState => {
    const mutationManager: MutationManager = MutationManagerFactory.getInstance();
    const mutableState: AppState = mutationManager.getMutableCopy(state);

    manageAction(mutableState, action, mutableState, rootManager, null);

    state = mutationManager.synchronizeState(state, mutableState);
    return state;
};

function manageAction(statePart: any, action: Action, state: AppState, manager: any, updateParentCallback: UpdateParentCallback) {
    let actionTypeString = getActionTypeString(action.type);

    if(manager[ACTIONS_MAP_PROPERTY] && manager[ACTIONS_MAP_PROPERTY][actionTypeString]) {
        manager[ACTIONS_MAP_PROPERTY][actionTypeString].forEach(( {handlerMethodName} ) => {
            const result = manager[handlerMethodName](statePart, action.payload, state);
            if(manager[RETURN_VALUES_METHODS_PROPERTY] && manager[RETURN_VALUES_METHODS_PROPERTY].indexOf(handlerMethodName) > -1) {
                updateParentCallback(result);
            }
        });
    }

    if(typeof(statePart) !== "undefined" && statePart !== null) {
        const innerManagersDescriptions: InnerManagerDescription[] = manager[PARTS_MANAGERS_PROPERTY] || [];
        innerManagersDescriptions.forEach(description => {
            manageAction(statePart[description.selector], action, state, description.manager, (newValue) => {
                statePart[description.selector] = newValue;
            });
        });

        const arrayItemsManagersDescription: ArrayItemManagerDescription[] = manager[ARRAY_ITEM_MANAGERS_PROPERTY] || [];
        arrayItemsManagersDescription.forEach(description => {
            const array: any[] = statePart[description.propertySelector];
            if(array && array.length && managerOrChildManagerCanHandleMethod(description.manager, actionTypeString)) {
                for(let i = 0; i < array.length; i++) {
                    const arrayItem = array[i];
                    if(description.itemSelector(arrayItem, action.payload, actionTypeString)) {
                        manageAction(arrayItem, action, state, description.manager, (newValue) => {
                            array[i] = newValue;
                        })
                    }
                }
            }
        });

        const reducersDescription: ReducerDescription[] = manager[REDUCERS_PROPERTY] || [];
        reducersDescription.forEach(description => {
            statePart[description.selector] = description.reducer(statePart[description.selector], description.actionMapper(action));
        });
    }

}

function managerOrChildManagerCanHandleMethod(manager, actionTypeString: string): boolean {
    if(manager[ACTIONS_MAP_PROPERTY] && manager[ACTIONS_MAP_PROPERTY][actionTypeString]) {
        return true;
    }

    const innerManagersDescriptions: InnerManagerDescription[] = manager[PARTS_MANAGERS_PROPERTY] || [];
    for(let i = 0; i < innerManagersDescriptions.length; i++) {
        if(managerOrChildManagerCanHandleMethod(innerManagersDescriptions[i].manager, actionTypeString)) {
            return true;
        }
    }

    const arrayItemsManagersDescription: ArrayItemManagerDescription[] = manager[ARRAY_ITEM_MANAGERS_PROPERTY] || [];
    for(let i = 0; i < arrayItemsManagersDescription.length; i++) {
        if(managerOrChildManagerCanHandleMethod(arrayItemsManagersDescription[i].manager, actionTypeString)) {
            return true;
        }
    }

    return false;
}