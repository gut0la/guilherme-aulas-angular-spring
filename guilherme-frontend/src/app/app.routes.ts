import {Routes} from '@angular/router';
import {authGuard} from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'home', loadComponent: () =>
      import('./components/home/home.component').then(m => m.HomeComponent),
    canActivate: [authGuard]
  },
  {
    path: 'login', loadComponent: () =>
      import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'cadastro', loadComponent: () =>
      import('./components/cadastro/cadastro.component').then(m => m.CadastroComponent)
  },
  {
    path: 'minhas-avaliacoes', loadComponent: () =>
      import('./components/minhas-avaliacoes/minhas-avaliacoes.component').then(m => m.MinhasAvaliacoesComponent),
    canActivate: [authGuard]
  },
  {
    path: 'favoritos', loadComponent: () =>
      import('./components/favoritos/favoritos.component').then(m => m.FavoritosComponent),
    canActivate: [authGuard]
  },
  {
    path: 'obra/:id', loadComponent: () =>
      import('./components/obra-detalhes/obra-detalhes.component').then(m => m.ObraDetalhesComponent),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
