import Router from 'next/router';
import { db } from '../../utils/firebase';
import { updateProfile } from 'firebase/auth';
import { doc, setDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';

const completeAcc = async (auth, email, name, username) => {

    const userVerify = query(collection(db, 'users'), where('username', '==', username));
    const res = await getDocs(userVerify);
    if(res.empty){
        // FAZER A OPERAÇÃO
        updateProfile(auth.currentUser, {
            displayName: username
        })
        .then(() => {
            // Profile updated!
            //console.log('Atualizaddo: ', auth.currentUser.displayName);
        }).catch((error) => {
            // An error occurred
            console.log(error);
        });
    
        const emailRef = doc(db, 'users', email);
        const user = auth.currentUser;
        setDoc(emailRef, {
            name: name,
            displayName: username,
            uid: user.uid,
            email: user.email,
            photoUrl: user.photoURL
        }, { merge: true });
        await updateDoc(emailRef, {
            complete: true
        });
        Router.push('/home');
    }
    else{
        // NÃO FAZER A OPERAÇÃO
        alert('Try another username');
    }




}

export { completeAcc }