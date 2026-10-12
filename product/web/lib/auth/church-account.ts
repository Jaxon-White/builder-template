import "server-only";

/**
 * Placeholder for real "Sign in with Church Account". See decision 004. To wire it up:
 *
 * 1. Get the app registered with the Church's sign-in service (Church Account). This needs a
 *    sponsoring Church department (e.g. Welfare / DI) and approval from Church IT (ICS). They
 *    provide an OpenID Connect issuer URL, a client ID and a client secret. Register the
 *    redirect URI https://<your-domain>/auth/church/callback.
 * 2. Set AUTH_MODE=church, AUTH_SECRET, CHURCH_OIDC_ISSUER, CHURCH_CLIENT_ID and
 *    CHURCH_CLIENT_SECRET.
 * 3. Implement the OpenID Connect authorization-code flow here (or use Auth.js with a generic
 *    OIDC provider): read the endpoints from {issuer}/.well-known/openid-configuration,
 *    redirect to the authorize endpoint, then in the callback exchange the code, read the
 *    user's identity from the ID token, look up their role, and set the session with
 *    encodeSession() from ./session.
 * 4. Decide where roles come from, e.g. an allow-list of approved accounts kept in SharePoint
 *    or by the app owner. Anyone without a role is refused: a Church Account alone does not
 *    mean someone should use the app.
 */
export function startChurchSignIn(): never {
  throw new Error(
    "Church Account sign-in is not configured yet. The app has to be registered with the Church first; see lib/auth/church-account.ts. Set AUTH_MODE=demo to use demo accounts.",
  );
}
