import {Component} from '@angular/core';
import {ApiService} from "./ApiService";

@Component({
    selector: 'data',
    template: `
        <button (click)="getData()">Request data</button>
        <div *ngIf="loading">Loading...</div>
        <div>Data: <pre>{{ data | json }}</pre></div>
    `,
    providers: [ApiService]
})
export class DataComponent {
    loading:boolean;
    data:any;

    constructor(private apiService:ApiService) {

    }

    getData() {
        this.loading = true;
        this.apiService.getData().subscribe(
            res => {
                this.data = res.json();
                this.loading = false;

                console.log('success');
            },
            err => this.loading = false);
    }


}