import { db } from '../../utils/firebase';
import { collection, setDoc, doc, serverTimestamp } from 'firebase/firestore';

const newNotes = async (title, content, owner) => {
    // Add a new document with a generated id
    const noteRef = doc(collection(db, 'notes'));
    
    // later...
    await setDoc(noteRef, {
        title: title,
        content: content,
        owner: owner,
        date: serverTimestamp(),
        id: noteRef.id
    });
}

export { newNotes };