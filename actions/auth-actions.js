/*
    il nous faut premierement creer un user account. pour cela, nous avons besoin d'un 'server action' pour extraire le mail et le password de l'utilisateur et les envoyer au serveur.
*/

"use server";

import { hashUserPassword } from "@/lib/hash.js";
import { createUser } from "@/lib/user";
import { redirect } from "next/navigation";

export async function signup(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  let errors = {};

  if (!email.includes("@")) {
    errors.email = "Please enter your email address.";
  }

  if (password.trim().length < 8) {
    errors.password = "Your password must be at least 8 characters long.";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  // nous aurons besoin du hook 'useFormState' de 'react-dom' pour afficher ces erreurs a l'utilisateur (sur la page ou se trouve le formulaire de signup auth-form.js)

  // store it in the database (create a new user). before we can do that, we need to hash the password 'lib/hash.js'

  // pour l'implementation de l'authentification, nous utiliserons le package 'lucia auth' qui gere l'authentification et la creation de compte utilisateur. il est base sur sqlite et est facile a utiliser. pour l'installer, nous devons executer la commande suivante: npm install lucia @lucia-auth/adapter-sqlite
  const hashedPassword = hashUserPassword(password);
  try {
    createUser(email, hashedPassword);
  } catch (error) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return {
        errors: {
          email: "This email is already in use.",
        },
      };
    }
    throw error;
  }

  redirect("/training");
}
