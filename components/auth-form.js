"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { signup } from "@/actions/auth-actions";

export default function AuthForm() {
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
        <button type="submit">Create Account</button>
      </p>
      <p>
        <Link href="/">Login with existing account.</Link>
      </p>
    </form>
  );
}
