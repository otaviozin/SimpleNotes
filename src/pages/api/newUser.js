import { db } from '../../utils/firebase';
import { signUp } from './signUp';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const newUser = async (auth, email, password) => {

    const emailRef = doc(db, 'users', email)
    const emailSnap = await getDoc(emailRef);

    if(emailSnap.exists()){
        return alert('Este email já está em uso');
    }
    else{
        await setDoc(doc(db , 'users', email), {
            email: email,
            complete: false
        });
        signUp(auth, email, password);
    }
}

export { newUser };