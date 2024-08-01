const Keycloak = require("keycloak-connect");
const session = require("express-session");
const memoryStore = new session.MemoryStore();
const kcConfig = {
  clientId: "dny-netflix",
  bearerOnly: true,
  serverUrl: "http://localhost:8080",
  realm: "Angular_Test",
  realmPublicKey:
    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAosrWi43+t6Cj0d+cyaqXXAliSTF6eYOZ+esB35s19I21d3+C2jJ/1MJPJkAOhXeFQ2G3TGgNc8jDOWYkFSzc99CLptVgOdVr6lBuzwQBJooQ/9lgAu32q0qipnzjjJWz63A5OA0D6nSkR1BH5tXSynrOPZNby5x433366eggy7P4XDZQwqoDgv0x0CYtVQYiRObCyVRl8OfYlk56l0dRDcLkIOu0wefUuveq8/Eh5/HqPhHklUZt1y3CLrGm8CQrtHTJ4boIWdMyzarLK2/vOKELPvDLD0GURPnsJryTSH/q7ODGsUhCkDay03NnQQkJTZZUHb2oP2CdLdcUsl5LWQIDAQAB",
};

export const keycloak = new Keycloak({ store: memoryStore }, kcConfig);