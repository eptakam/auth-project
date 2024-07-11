/*
    Nous creeons ce layout car nous desirons mettre un entete de page qui ne sera visible que lorsque l'utilisateur est authentifie (login). 

    pour cela, nous avons besoin d'un route groupe qui englobe toutes les pages de l'application qui necessitent une authentification. le route groupe est un dossier dont le nom est entre parentheses et qui contient tous les fichiers dont l'on desire grouper les routes.

    ceci nous permet de definir un layout juste pour ces pages.
*/

import "../globals.css";

export const metadata = {
  title: "Next Auth",
  description: "Next.js Authentication",
};

export default function AuthRootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header id="auth-header">
          <p>Welcome back!</p>
          <form>
            <button>Logout</button>
          </form>
        </header>
        {children}
      </body>
    </html>
  );
}
