import {Injectable, Inject} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class ApiService {

    constructor(private http: Http,
                @Inject('APP_CONST') private appConst: string){

        console.log(this.appConst);
    }

    getData() {
        return this.http.get('http://jsonplaceholder.typicode.com/posts/1');
    }
}