import { db } from '../../utils/firebase';
import { doc, getDoc } from 'firebase/firestore';

const getUserNote = async (noteId) => {

    const docRef = doc(db, 'notes', noteId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
        //console.log('Document data:', docSnap.data());
        return docSnap.data();
    } else {
        // doc.data() will be undefined in this case
        //console.log('No such document!');
    }
}

export { getUserNote };
