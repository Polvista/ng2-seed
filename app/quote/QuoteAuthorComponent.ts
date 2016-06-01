import { Component, Input } from '@angular/core';
import {Quote} from "./Quote";

@Component({
    selector: 'quote-author',
    template: `
        <span class="quote-author text">- {{author}}</span>
    `,
    styleUrls: ['app/quote/quoteAuthor.css']
})
export class QuoteAuthorComponent {
    @Input() author: string;


}