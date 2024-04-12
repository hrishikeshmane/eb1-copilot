export {};

export type Roles = "admin" | "moderator" | "customer" | "vendor";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role: Roles;
      onBoarded: boolean;
    };
  }
}
