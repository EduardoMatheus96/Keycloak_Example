import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { CreateMovieComponent } from './components/create-movie/create-movie.component';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
  { path: '', component: HomepageComponent, canActivate: [AuthGuard] },
  { path: 'create-movie', component: CreateMovieComponent, canActivate: [AuthGuard], data: { roles: ['movie_creator'] } },
  { path: '**', redirectTo: '' }
];
