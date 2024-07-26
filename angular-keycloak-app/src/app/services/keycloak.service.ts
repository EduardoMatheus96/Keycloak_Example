import { Injectable } from '@angular/core';
import Keycloak, { KeycloakInstance, KeycloakConfig } from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private keycloak!: KeycloakInstance;

  init(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const config: KeycloakConfig = {
        url: 'http://localhost:8080/',
        realm: 'Angular_Test',
        clientId: 'myclient'
      };

      this.keycloak = new Keycloak(config);

      this.keycloak.init({ onLoad: 'login-required' }).then(authenticated => {
        if (authenticated) {
          resolve();
        } else {
          this.keycloak.login();
        }
      }).catch(() => {
        reject();
      });
    });
  }

  getKeycloakInstance(): KeycloakInstance {
    return this.keycloak;
  }
}
