import {Routes} from '@angular/router';
import {ListComponent} from './views/list/list.component';
import {ResolverService} from './services/resolver.service';

export const routes: Routes = [
  {path: '', redirectTo: '/list', pathMatch: 'full'},
  {
    path: 'list',
    component: ListComponent
  },
  {
    path: 'add-pet',
    loadComponent: () => import('./views/add/add.component').then((add) => add.AddComponent),
  },
  {
    path: 'edit-pet/:id',
    loadComponent: () => import('./views/edit/edit.component').then((edit) => edit.EditComponent),
    resolve: {pet: ResolverService}
  },
  {
    path: 'details-pet/:id',
    loadComponent: () => import('./views/details/details.component').then((details) => details.DetailsComponent),
    resolve: {pet: ResolverService},
  },
  {
    path: '**',
    redirectTo: '/list',
  },
];
