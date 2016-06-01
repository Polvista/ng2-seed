import {Injectable, Inject} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class ApiService {

    constructor(private http: Http,
                @Inject('APP_CONST') private appConst: string){

        console.log(this.appConst);
    }

    getData() {
        return this.http.get('https://baconipsum.com/api/?type=meat-and-filler');
    }
}