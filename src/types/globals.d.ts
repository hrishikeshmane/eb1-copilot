export {};

export type Roles = "admin" | "moderator" | "customer" | "vendor";

export type TransformedUser = {
  firstName: string | null;
  lastName: string | null;
  emailAddresses: string;
  imageUrl: string | undefined;
  contactNumber: string | null;
  onBoarded: boolean;
  role: string;
  id: string | null;
};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role: Roles;
      onBoarded: boolean;
    };
  }
}
