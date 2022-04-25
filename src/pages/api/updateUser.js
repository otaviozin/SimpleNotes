import Router from 'next/router';
import { db } from '../../utils/firebase';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc, getDocs, collection, query, where } from 'firebase/firestore';

const updateUser = async (auth, displayName, email, photoUrl) => {
    // displayName update
    if(displayName){
        updateProfile(auth.currentUser, {
            displayName: displayName
        }).then(() => {
            Router.push(`${displayName}/`)
            console.log('Username updated!');
        }).catch((error) => {
            console.log(error);
        });

        // Update in Firestore
        const userEmailRef = doc(db, 'users', email);
        await updateDoc(userEmailRef, {
            displayName: displayName
        });

        const q = query(collection(db, 'notes'), where('owner', '==', displayName));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            doc.ref.update({
                owner: displayName
            });
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
    }
}

export { updateUser };