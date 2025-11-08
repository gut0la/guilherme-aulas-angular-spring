import {Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {CadastroComponent} from './components/cadastro/cadastro.component';
import {authGuard} from './guards/auth.guard';
import {guestGuard} from './guards/guest.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent, canActivate: [guestGuard] },
  { path: 'cadastro', component: CadastroComponent, canActivate: [guestGuard] },
  {
    path: 'minhas-avaliacoes',
    loadComponent: () =>
      import('./components/minhas-avaliacoes/minhas-avaliacoes.component').
      then(m => m.MinhasAvaliacoesComponent), canActivate: [authGuard] },
  {
    path: 'favoritos', loadComponent: () =>
      import('./components/favoritos/favoritos.component')
        .then(m => m.FavoritosComponent), canActivate: [authGuard] },
  {
    path: 'obra/:id',
    loadComponent: () =>
      import('./components/obra-detalhes/obra-detalhes.component').
      then(m => m.ObraDetalhesComponent),
    canActivate: [authGuard] },
  { path: '**', redirectTo: '/login' }

];
