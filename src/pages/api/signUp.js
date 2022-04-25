import Router from 'next/router';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const signUp = (auth, email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        //const user = userCredential.user;
        //console.log(user);
        Router.push('/register/end');   
    })
    .catch((error) => {
        //const errorCode = error.code;
        //const errorMessage = error.message;
        console.log(errorCode);
    });
}

export { signUp }