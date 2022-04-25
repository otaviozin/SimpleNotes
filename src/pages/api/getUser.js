import { db } from '../../utils/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const getUser = async (username) => {

    const q = query(collection(db, 'users'), where('displayName', '==', username));
    const querySnapshot = await getDocs(q);

    let user = [];
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, ' => ', doc.data());
        user.push(doc.data());
    });
    return user;
}

export { getUser };