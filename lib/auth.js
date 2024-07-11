/*
  ici nous creerons une session et stockerons les informations relatives dans la BD grace au package 'lucia auth' 

  le parametre 'Adapter' nous permettra de dire a 'lucia auth' comment stocker les informations relatives a la session dans la BD. nous utiliserons 'BetterSqlite3Adapter' pour stocker les informations relatives a la session dans la BD sqlite
 */

import { Lucia } from "lucia";
import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";

import db from "./db";
import { cookies } from "next/headers";

// initialiser Lucia
const adapter = new BetterSqlite3Adapter(db, {
  user: "users",
  session: 'sessions'
});

const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  }
});

export async function createAuthSession(userId){
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
}

// verifier l'existance d'une session
export async function verifyAuth() {
  const sessionCookie = cookies().get(lucia.sessionCookieName);

  if (!sessionCookie) {
    return {
      user: null,
      session: null,
      // on peut juste aussi retourner false pour indiquer que l'utilisateur n'est pas authentifie
    };
  }

  const sessionId = sessionCookie.value;

  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  const result = await lucia.validateSession(sessionId);

  // verifier si nous avons une session valide et active
  try{
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createBlankSessionCookie(result.session.id);
      // recreer le cookie pour la session existante active
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }

    // verifier l'existance d'une session dans le resultat
    if (!result.session) {
      // effacer le cookie de la session
      const sessionCookie = lucia.createBlankSessionCookie();

      // recreer le cookie pour la session existante active
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch (error) {}

  return result;
}