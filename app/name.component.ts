import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import {Name} from "./name.model";
import {AppService} from "./AppService";
import {User} from "./AppService";

@Component({
    selector: 'name',
    template: `
        <div (click)="onClick()" [ngClass]="{lol: true}">{{ name.value }}</div>
    `,
    host: {
        class: 'lol'
    },
    providers: [AppService]
})
export class NameComp implements OnInit {

    @Input()
    name: Name;

    @Output()
    event = new EventEmitter<string>();

    constructor(private appService: AppService){
        console.log(`Name in constructor ${this.name}`);
    }

    ngOnInit() {
        this.appService.currentUser.subscribe((user: User) => console.log(user));

        console.log(`Name in init ${this.name}`);
    }

    onClick() {
        this.event.emit('lol');
    }

}
