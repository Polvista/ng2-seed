import {MutationManager} from "./MutationManager";
import {Es5MutationManager} from "./FullCheckMutationManager";
import {ProxyMutationManager} from "./ProxyMutationManager";

export class MutationManagerFactory {
    private static INSTANCE: MutationManager;

    public static getInstance(): MutationManager {
        if(!MutationManagerFactory.INSTANCE) {

            if(typeof Proxy !== "undefined") {
                MutationManagerFactory.INSTANCE = new ProxyMutationManager();
            } else {
                MutationManagerFactory.INSTANCE = new Es5MutationManager();
            }

        }

        return MutationManagerFactory.INSTANCE;
    }

}