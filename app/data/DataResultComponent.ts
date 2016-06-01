import {Component, Input} from '@angular/core';

@Component({
    selector: 'data-result',
    template: `<div>Data: <pre>{{ data | json }}</pre></div>`
})
export class DataResultComponent {

    @Input()
    data: any;
}