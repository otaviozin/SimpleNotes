import Router from 'next/router';
import { signOut } from 'firebase/auth';

const logOut = (auth) => {
    signOut(auth)
    .then(() => {
        // Sign-out successful.
        Router.push('/')
    })
    .catch((error) => {
        // An error happened.
        //console.log(error);
    });
}

export { logOut }