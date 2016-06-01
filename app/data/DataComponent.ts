import {Component} from '@angular/core';
import {ApiService} from "./ApiService";
import {DataResultComponent} from "./DataResultComponent";
import { Routes, ROUTER_DIRECTIVES, Router } from '@angular/router';

@Component({
    selector: 'data',
    template: `
        <button (click)="getData()">Request data</button>
        <div *ngIf="loading">Loading...</div>

        <!--<a *ngIf="loaded" [routerLink]="['result']">To results</a><br/>-->


        <router-outlet></router-outlet>
    `,
    providers: [ApiService],
    directives: [ROUTER_DIRECTIVES]
})
@Routes([
    {path: '/result', component: DataResultComponent}
])
export class DataComponent {
    loading:boolean;
    loaded: boolean;
    data:any;

    constructor(private apiService:ApiService, private router: Router) {

    }

    getData() {
        this.loading = true;
        this.apiService.getData().subscribe(
            res => {
                this.data = res.json();
                this.loading = false;
                this.loaded = true;

                this.router.navigate(['/data/result']);

                console.log('success');
            },
            err => this.loading = false);
    }


}