import { Routes } from '@angular/router';
import { AuthGuard } from './auth-guard';
import { MainLayoutPage } from './layout/main-layout/main-layout.page';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'app',
    component: MainLayoutPage,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'vault',
        loadComponent: () => import('./vault/vault.page').then((m) => m.VaultPage),
        canActivate: [AuthGuard],
      },
      {
        path: 'approvals',
        loadComponent: () => import('./approvals/approvals.page').then((m) => m.ApprovalsPage),
        canActivate: [AuthGuard],
      },
      {
        path: 'account',
        loadComponent: () => import('./account/account.page').then((m) => m.AccountPage),
        canActivate: [AuthGuard],
      },
      {
        path: 'connections',
        loadComponent: () => import('./connections/connections.page').then((m) => m.ConnectionsPage),
        canActivate: [AuthGuard],
      },
      {
        path: 'identity',
        loadComponent: () => import('./identity/identity.page').then((m) => m.IdentityPage),
        canActivate: [AuthGuard],
      },
      {
        path: 'draft-review',
        loadComponent: () => import('./draft-review/draft-review.page').then((m) => m.DraftReviewPage),
        canActivate: [AuthGuard],
      },
      {
        path: 'splash',
        loadComponent: () => import('./splash/splash.page').then(m => m.SplashPage)
      },
      {
        path: 'home',
        loadComponent: () => import('./home/home.page').then(m => m.HomePage),
        canActivate: [AuthGuard]
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      }
    ]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];