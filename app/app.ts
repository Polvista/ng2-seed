/// <reference path="../typings/tsd.d.ts" />

import { Component, ElementRef } from "@angular/core";
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';
import {Name} from "./name.model";
import {NameComp} from "./name.component";
import {AppService} from "./AppService";
import {User} from "./AppService";
import {BehaviorSubject, Subject, Observable} from 'rxjs';
import {DataComponent} from "./DataComponent";
import {DataResultComponent} from "./DataResultComponent";

@Component({
    selector: 'app',
    template: `
        <div>app 5 {{ title }}</div>

        <div>
            <form (submit)="add(text)">
                <input #text type="text" (keydown.space)="log('space')">
                <input type="submit">
            </form>
        </div>

        <div>{{ keyups | async }}</div>

        <div>
            <name *ngFor="let name of names" [name]="name" (event)="log($event)"></name>
        </div>

        <div>User: {{ getName(currentUser | async) }}</div>

        <a [routerLink]="['/']">To home</a><br/>
        <a [routerLink]="['/data']">To data</a><br>

        <router-outlet></router-outlet>
    `,
    directives: [ROUTER_DIRECTIVES, NameComp],
    providers: [AppService]

})
@Routes([
    { path: '/data', component: DataComponent},
    {path: '/result/:id', component: DataResultComponent}
])
export class App {
    title: string = 'title';
    names: Name[] = [];
    currentUser: Subject<User>;
    keyups: Observable<any>;

    constructor(private appService: AppService, private el: ElementRef) {

        this.appService.currentUser.subscribe((user: User) => console.log(user));
        this.currentUser = appService.currentUser;

        console.log(el);
        this.keyups = Observable.fromEvent(this.el.nativeElement, 'keyup').map(e => e.target.value);

    }

    add(text: HTMLInputElement) {
        this.names.push({value: text.value});
        this.appService.setCurrentUser({name: text.value});

        text.value = '';
    }

    log(message: string) {
        console.log(message);
    }

    getName(user: User){
        return user ? user.name : '';
    }

}