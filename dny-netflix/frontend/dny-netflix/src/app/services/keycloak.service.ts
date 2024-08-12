import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({ providedIn: 'root' })
export class KeycloakOperationService {
  constructor(private readonly keycloak: KeycloakService) {}

  isLoggedIn(): boolean {
    return this.keycloak.isLoggedIn();
  }

  logout(): void {
    this.keycloak.logout();
  }

  getUserProfile(): Promise<any> {
    return this.keycloak.loadUserProfile();
  }

  getToken(): Promise<string> {
    return this.keycloak.getToken();
  }

  hasRealmRole(role: string): boolean {
    return this.keycloak.isUserInRole(role);
  }

  // Outros métodos personalizados
}
