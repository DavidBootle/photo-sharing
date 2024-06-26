import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component'
import { UploadPageComponent } from './upload-page/upload-page.component';
import { ManagementPageComponent } from './management-page/management-page.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent, pathMatch: 'full' }, // default route for home page
    { path: 'manage', component: ManagementPageComponent },
    { path: 'upload', component: UploadPageComponent},
];
