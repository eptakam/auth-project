/*
    il nous faut premierement creer un user account. pour cela, nous avons besoin d'un 'server action' pour extraire le mail et le password de l'utilisateur et les envoyer au serveur.
*/

'use server';

export async function signup(prevState, formData) {
    const email = formData.get('email');
    const password = formData.get('password');

    let errors = {};

    if (!email.includes('@')) {
        errors.email = 'Please enter your email address.';
    }

    if (password.trim().length < 8) {
        errors.password = 'Your password must be at least 8 characters long.';
    }

    if (Object.keys(errors).length > 0) {
        return { errors };
    }

    // nous aurons besoin du hook 'useFormState' de 'react-dom' pour afficher ces erreurs a l'utilisateur (sur la page ou se trouve le formulaire de signup auth-form.js)

    // store it in the database (create a new user)
}

