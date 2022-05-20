import Router from 'next/router';
import { db } from '../../utils/firebase';
import { updateProfile, updateEmail, updatePassword } from 'firebase/auth';
import { doc, updateDoc, getDocs, collection, query, where } from 'firebase/firestore';

const updateUser = async (auth, userName, displayName, email, password, photoUrl) => {
    
    const userEmailRef = doc(db, 'users', email);

    // user name update 
    if(userName){
        await updateDoc(userEmailRef, {
            'name': userName
        });
    }

    // displayName update
    if(displayName){
        updateProfile(auth.currentUser, {
            displayName: displayName
        }).then(() => {
            Router.push(`/${displayName}`)
            console.log('Username updated!');
        }).catch((error) => {
            console.log(error);
        });

        // Update in Firestore
        await updateDoc(userEmailRef, {
            'displayName': displayName
        });

        const q = query(collection(db, 'notes'), where('owner', '==', auth.currentUser.displayName));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(async (res) => {
            const docSnap = doc(db, 'notes', res.id);
            await updateDoc(docSnap, {
                'owner': displayName
            });
        });
    }

    // email update
    if(email){
        updateEmail(auth.currentUser, email)
        .then(() => {
            // Email updated!
            console.log('Email update!')
        }).catch((error) => {
            // An error occurred
            console.log(error);
        });
    }

    // photoURL update
    if(photoUrl){
        updateProfile(auth.currentUser, {
            photoURL: photoUrl
        }).then(() => {
            console.log('Profile image updated!')
        }).catch((error) => {
            console.log(error);
        });

        await updateDoc(userEmailRef, {
            'photoUrl': photoUrl
        });
    }

    // password update
    if(password){
        updatePassword(auth.currentUser, password)
        .then(() => {
            // Update successful.
            console.log('Password updated');
        }).catch((error) => {
            // An error ocurred
            console.log('error: ', error);
        });
    }
}

export { updateUser };