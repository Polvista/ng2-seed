import { Component, Input } from '@angular/core';
import {Quote} from "./Quote";
import {QuoteAuthorComponent} from "./QuoteAuthorComponent";

declare var module;

@Component({
    //moduleId: module.id, //TODO relative
    selector: 'quote',
    template: `
        <span class="quote-text text">"{{quote.text}}"</span><br/>
        <quote-author [author]="quote.author"></quote-author>
        <br>
        <ng-content></ng-content>
    `,
    directives: [QuoteAuthorComponent],
    styleUrls: ['app/quote/quote.css']  //TODO relative
})
export class QuoteComponent {

    @Input() quote: Quote;

}