import { Routes } from '@angular/router';
import { PetPageComponent } from './pet-page/pet-page.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
    { path: '', component: PetPageComponent },
    { path: 'about-me', component: AboutMeComponent },
    { path: '**', component: PageNotFoundComponent },
];
