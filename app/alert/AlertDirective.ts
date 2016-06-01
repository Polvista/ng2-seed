import { Directive, Input } from "@angular/core";
import {Quote} from "../quote/Quote";

@Directive({
    selector: '[alert]',
    host: {
        '(click)': 'showAlert()'
    },
    exportAs: 'alert'
})
export class Alert {

    @Input() alert: string;
    @Input() quote: Quote;

    private showAlert() {
        alert(this.quote.text);
    }
}
