import {StateObjectsCache} from "./StateObjectsCache";

export class MapCache implements StateObjectsCache{

    constructor(private map: Map<any, any> | WeakMap<any, any>) {}

    saveObject(keyObject: any, valueObject: any) {
        this.map.set(keyObject, valueObject);
    }

    hasObject(keyObject: any): boolean {
        return this.map.has(keyObject);
    }

    getValue(keyObject: any): any {
        return this.map.get(keyObject);
    }

    deleteObject(keyObject: any) {
        this.map.delete(keyObject);
    }
}