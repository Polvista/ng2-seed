import {Injectable} from "@angular/core";
import {BehaviorSubject, Subject, ReplaySubject} from 'rxjs';

export interface User {
    name: string
}

@Injectable()
export class AppService {
    public currentUser: Subject<User> = new ReplaySubject<User>();

    setCurrentUser(user: User) {
        this.currentUser.next(user);
    }

}