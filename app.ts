/// <reference path="typings/tsd.d.ts" />

import { Component } from "@angular/core";
import {Name} from "./name.model";
import {NameComp} from "./name.component";

@Component({
    selector: 'app',
    template: `
        <div>app 5 {{ title }}</div>

        <div>
            <form (submit)="add(text)">
                <input #text type="text">
                <input type="submit">
            </form>
        </div>

        <div>
            <name *ngFor="let name of names" [name]="name"></name>
        </div>
    `,
    directives: [NameComp]

})
export class App {
    title: string = 'title';
    names: Name[] = [];

    constructor() {
    }

    add(text: HTMLInputElement) {
        this.names.push({value: text.value});
        text.value = '';
    }

}