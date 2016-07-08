import {StateObjectsCache} from "./StateObjectsCache";

export class FakeCache implements StateObjectsCache {

    saveObject(keyObject: any, valueObject: any) {
        //do nothing
    }

    hasObject(keyObject: any): boolean {
        return false;
    }

    getValue(keyObject: any): any {
        return undefined;
    }

    deleteObject(keyObject: any) {
        //do nothing
    }

}