import {MutationManager} from "./MutationManager";
import {Es5MutationManager} from "./FullCheckMutationManager";
import {ProxyMutationManager} from "./ProxyMutationManager";

export class MutationManagerFactory {
    private static INSTANCE: MutationManager;

    public static getInstance(): MutationManager {
        if(!MutationManagerFactory.INSTANCE) {
            //MutationManagerFactory.INSTANCE = new ProxyMutationManager();

            MutationManagerFactory.INSTANCE = new Es5MutationManager();
        }

        return MutationManagerFactory.INSTANCE;
    }

}