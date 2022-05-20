import { db } from '../../utils/firebase';
import { doc, updateDoc, increment, arrayUnion, arrayRemove } from "firebase/firestore";


const likeNote = async (noteId, email) => {
    const noteRef = doc(db, 'notes', noteId);
    const userRef = doc(db, 'users', email);
    
    await updateDoc(noteRef, {
        likes: increment(1)
    });

    await updateDoc(userRef, {
        liked: arrayUnion(noteId)
    });
}

const undoLike = async (noteId, email) => {
    const noteRef = doc(db, 'notes', noteId);
    const userRef = doc(db, 'users', email);
    
    await updateDoc(noteRef, {
        likes: increment(-1)
    });

    await updateDoc(userRef, {
        liked: arrayRemove(noteId)
    });
}

export { likeNote, undoLike };