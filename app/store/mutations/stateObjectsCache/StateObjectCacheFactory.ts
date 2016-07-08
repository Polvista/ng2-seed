import {StateObjectsCache} from "./StateObjectsCache";
import {FakeCache} from "./FakeCache";
import {MapCache} from "./MapCache";

export class StateObjectCacheFactory {

    static getObjectsCache(): StateObjectsCache {
        if(typeof WeakMap !== "undefined") {
            return new MapCache(new WeakMap<any, any>());
        } else if(typeof Map !== "undefined") {
            return new MapCache(new Map<any, any>());
        }

        return new FakeCache();
    }

}