import Router from 'next/router';
import { db } from '../../utils/firebase';
import { doc, getDoc } from 'firebase/firestore';

const verifyComplete = async (email) => {
    const emailRef = doc(db, 'users', email)
    const emailSnap = await getDoc(emailRef);
    
    if(emailSnap.data().complete){
        return;
    }
    else{
        Router.push('/register/end');
    }
}

export { verifyComplete };