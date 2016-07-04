import { RouterConfig } from '@angular/router';
import { ReduxTestComponent } from "./../redux/ReduxTestComponent";
import {AboutComponent} from "./../about/AboutComponent";

export const routes: RouterConfig = [
    { path: 'about/:id', component: AboutComponent },
    { path: '', component: ReduxTestComponent }
];