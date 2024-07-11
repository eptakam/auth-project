/*
  ici nous nous servons des emails et des mots de passe valident pour creer un nouvel utilisateur dans la base de donnees.
*/

import db  from "./db";

export function createUser(email, password) {
  const result = db
  .prepare("INSERT INTO users (email, password) VALUES (?, ?)")
  .run(email, password);
  return result.lastInsertRowid;
}