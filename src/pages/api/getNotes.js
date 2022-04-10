import { db } from '../../utils/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

const getNotes = async () => {
    const q = query(collection(db, 'notes'), orderBy('date', 'desc'));
    const querySnapshot = await getDocs(q);


    let notes = [];
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, ' => ', doc.data());
        notes.push(doc.data());
    });
    return notes;
}

export { getNotes };