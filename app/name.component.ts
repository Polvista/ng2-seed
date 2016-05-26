import { Component, Input } from "@angular/core";
import {Name} from "./name.model";

@Component({
    selector: 'name',
    template: `
        <div>{{ name.value }}</div>
    `
})
export class NameComp {

    @Input() name: Name;


}
