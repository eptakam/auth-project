/*
    Nous voulons etre capable de switcher entre le mode signup et login.

    deux possibilites s'offrent a nous: l'utilisation de 'useState' hook ou du '{searchParams}' props qui est passe automatiquement a toutes les pages par Next.js.

    nous allons utiliser le '{searchParams}' props pour passer le mode de formulaire entre les pages.

    pour cela, nous allons ajouter un query parameter a l'URL de la page de connexion. ce query parameter sera 'mode' et il aura deux valeurs possibles: 'login' et 'signup'.

    puis, ce query parameter sera passe au composant 'AuthForm' en tant que props. et sera capter au niveau de la page de connexion pour afficher le formulaire de connexion ou de cration de compte. dans notre cas, il s'agira de la page d'accueil 'app/page.js'.
*/

"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { signup } from "@/actions/auth-actions";

export default function AuthForm({ mode }) {
  // mode peut etre 'login' ou 'signup'
  const [formState, formAction] = useFormState(signup, {});
  return (
    <form id="auth-form" action={formAction}>
      <div>
        <img src="/images/auth-icon.jpg" alt="A lock icon" />
      </div>
      <p>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
        {/* afficher les erreurs dues a l'email en dessous du champ de saisie */}
        {formState.errors &&
          // errors represente les cles de l'objet errors du 'server actions' dans le fichier auth-actions.js
          // Object.keys() : convertit l'objet passe en argument en tableau de clés
          Object.keys(formState.errors)
            .filter((error) => error === "email")
            .map((error) => (
              <div key={error} className="input-errors">
                {formState.errors[error]}
              </div>
            ))}
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        {/* afficher les erreurs dues au password en dessous du champ de saisie */}
        {formState.errors &&
          // Object.keys : convertit l'objet passe en argument en tableau de clés
          Object.keys(formState.errors)
            .filter((error) => error === "password")
            .map((error) => (
              <div key={error} className="input-errors">
                {formState.errors[error]}
              </div>
            ))}
      </p>
      {/* afficher les erreurs generales au-dessus du bouton 'Create Account' */}
      {/* {formState.errors && (
        <ul id="form-errors"> */}
      {/* Object.keys : convertit un objet en tableau de clés */}
      {/* {Object.keys(formState.errors).map((error) => (
            <li key={error}>{formState.errors[error]}</li>
          ))}
        </ul>
      )} */}
      <p>
        <button type="submit">
          {mode === "login" ? "Login" : "Create Account"}
        </button>
      </p>
      <p>
        {mode === "login" && (
          <Link href="/?mode=signup">Create an account.</Link>
        )}
        {mode === "signup" && (
          <Link href="/?mode=login">Login with existing account.</Link>
        )}
      </p>
    </form>
  );
}
