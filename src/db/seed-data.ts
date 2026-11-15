/**
 * DATABASE SEED — SERVER ONLY.
 *
 * Holds the seed credential. Nothing in this file may be imported by a client component: the password
 * below would be bundled into the JavaScript the browser downloads. Client code imports the
 * credential-free profiles and content from `@/data/demo-content` instead.
 *
 * The account profiles are defined ONCE, in demo-content.ts, and the password is attached here. That
 * keeps a single source of truth for the demo accounts while ensuring the secret only ever exists on
 * the server half of the graph.
 */

import { DEMO_ACCOUNTS, DEMO_ANNOTATIONS, DEMO_QUIZZES } from "@/data/demo-content";

/**
 * Shared password for the demo accounts.
 *
 * This is a teaching deployment with three fictitious seeded users and no real authentication: the
 * auth route accepts an email and returns the matching account. It is still kept out of the client
 * bundle, because "it is only a demo" is how a real secret ends up shipped later.
 */
const SEED_PASSWORD = "password123";

export const INITIAL_USERS = DEMO_ACCOUNTS.map((account) => ({
  ...account,
  password: SEED_PASSWORD,
}));

/** Re-exported under their original names so the server-side seeders are unchanged. */
export const INITIAL_ANNOTATIONS = DEMO_ANNOTATIONS;
export const INITIAL_QUIZZES = DEMO_QUIZZES;
