import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  async canActivate(): Promise<boolean> {
    // Check if an access token exists
    const token = this.authService.getAccessToken();
    console.log("token", token)
    if (token) {
      // Token exists, consider user logged in
      return true;
    }
    // Attempt to refresh tokens if possible
    try {
      await this.authService.refreshTokens();
      const newToken = this.authService.getAccessToken();
      return !!newToken;
    } catch (error) {
      // Refresh failed, redirect to login
      this.router.navigate(['/login']);
      return false;
    }
  }

}
