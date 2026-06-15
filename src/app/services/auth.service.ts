import { Injectable, inject } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
// import { authCodeFlowConfig } from '../auth.config';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private oauthService = inject(OAuthService);
  private router = inject(Router);
  private http = inject(HttpClient);

  constructor() {
    // this.configure();
  }
  private accessToken: string | null = null;

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  clearAccessToken() {
    this.accessToken = null;
  }
  exchangeCode(code: string): Observable<{ accessToken: string, refreshToken: string }> {
    return this.http.post<{ accessToken: string, refreshToken: string }>('http://localhost:3000/auth/exchange', { code });
  }

  async saveTokens(accessToken: string, refreshToken: string) {
    await Preferences.set({ key: 'accessToken', value: accessToken });
    await Preferences.set({ key: 'refreshToken', value: refreshToken });
  }


  async getRefreshToken() {
    const { value } = await Preferences.get({ key: 'refreshToken' });
    return value;
  }

  async refreshTokens() {
    const refreshToken = await this.getRefreshToken();
    if (!refreshToken) throw new Error('No refresh token available');

    return new Promise((resolve, reject) => {
      this.http.post<{ accessToken: string }>('http://localhost:3000/auth/refresh', {}, { withCredentials: true })
        .subscribe({
          next: async (res) => {
            this.setAccessToken(res.accessToken);
            resolve(res.accessToken);
          },
          error: (err) => reject(err)
        });
    });
  }

  // private configure() {
  //   this.oauthService.configure(authCodeFlowConfig);
  //   this.oauthService.setupAutomaticSilentRefresh();
  // }

  // async initAuth(): Promise<void> {
  //   await this.oauthService.loadDiscoveryDocumentAndTryLogin();
  // }

  // login() {
  //   this.oauthService.initLoginFlow();
  // }
  login() {
    window.location.href = 'http://localhost:3000/auth/google';
  }

  // logout() {
  //   this.oauthService.logOut();
  //   window.location.href = '/login';
  // }

  // get isLoggedIn(): boolean {
  //   return this.oauthService.hasValidAccessToken();
  // }

  // get accessToken(): string | null {
  //   return this.oauthService.getAccessToken();
  // }

  // get userProfile() {
  //   const claims = this.oauthService.getIdentityClaims() as any;
  //   if (!claims) return null;

  //   return {
  //     name: claims.name || claims.given_name,
  //     email: claims.email,
  //     avatar: claims.picture
  //   };
  // }
}
