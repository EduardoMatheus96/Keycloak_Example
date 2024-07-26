import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeycloakService } from './services/keycloak.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="isAuthenticated">
      <h1>Bem-vindo, {{ preferredUsername }}!</h1>
      <button (click)="logout()">Logout</button>
    </div>
    <div *ngIf="!isAuthenticated">
      <h1>Carregando...</h1>
    </div>
  `
})
export class AppComponent implements OnInit {
  isAuthenticated = false;
  preferredUsername: string | undefined;

  constructor(public keycloakService: KeycloakService) {}

  ngOnInit(): void {
    this.keycloakService.init().then(() => {
      const keycloakInstance = this.keycloakService.getKeycloakInstance();
      this.isAuthenticated = keycloakInstance.authenticated ?? false;
      this.preferredUsername = keycloakInstance.tokenParsed?.['preferred_username'];
    }).catch(() => {
      this.isAuthenticated = false;
    });
  }

  logout(): void {
    this.keycloakService.getKeycloakInstance().logout();
  }
}
