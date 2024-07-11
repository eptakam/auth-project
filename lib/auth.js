/*
  ici nous creerons une session et stockerons les informations relatives dans la BD grace au package 'lucia auth' 

  le parametre 'Adapter' nous permettra de dire a 'lucia auth' comment stocker les informations relatives a la session dans la BD. nous utiliserons 'BetterSqlite3Adapter' pour stocker les informations relatives a la session dans la BD sqlite
 */

import { Lucia } from "lucia";
import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";

import db from "./db";

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