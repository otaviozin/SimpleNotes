import { signInWithEmailAndPassword } from 'firebase/auth';
import Router from 'next/router';

const signIn = (auth, email, password) => {
	signInWithEmailAndPassword(auth, email, password)
	.then((userCredential) => {
		// Signed in
		//const user = userCredential.user;
		//console.log(user);
		Router.push('/home');
	})
	.catch((error) => {
		//const errorCode = error.code;
		//const errorMessage = error.message;
		//console.error(errorCode);
	});
}

export { signIn };