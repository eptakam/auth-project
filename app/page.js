import AuthForm from "@/components/auth-form";

export default async function Home({ searchParams }) {
  // capter le mode de formulaire (login ou signup) a partir de l'URL grace a 'searchParams' ({mode} dans notre cas) passe en props au composant 'AuthForm' du fichier 'components/auth-form.js'

  // si le mode n'est pas specifie, nous utiliserons 'login' comme valeur par defaut
  const formMode = searchParams.mode || "login";
  return <AuthForm mode={formMode} />;
}
