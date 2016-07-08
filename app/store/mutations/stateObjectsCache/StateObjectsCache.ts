export interface StateObjectsCache {

    saveObject(keyObject: any, valueObject: any): void;

    hasObject(keyObject: any): boolean;

    getValue(keyObject: any): any;

    deleteObject(keyObject: any): void;

}