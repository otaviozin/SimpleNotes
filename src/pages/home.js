import Router from 'next/router';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { useEffect } from 'react';
import { logOut } from './api/signOut';
import { onAuthStateChanged } from 'firebase/auth';
import { userAuth } from '../utils/firebase';
import { verifyComplete } from './api/complete';
import { getNotes } from './api/getNotes';
import { useState } from 'react';

export default function Home(){

    const [notes, setNotes] = useState([]);
    
    useEffect(() => {
        // GET NOTES AND SET STATE
        const res = async () => {
            const note = await getNotes();
            setNotes(note);
        }
        res();

        onAuthStateChanged(userAuth, (user) => {
            if(!user){
                // Not logged
				//const uid = user.uid;
				Router.push('/')            
			}
            else{
                verifyComplete(user.email)
            }
        });
    }, []);
    
    const signOut = () => {
        try{
            logOut(userAuth);
        }
        catch(error){
            console.log(error);
        }
    }

    return(
        <div className='bg-neutral-900 h-screen'>
            <div className='bg-neutral-900 h-max text-white'>
                <Navbar />
                <div className='grid grid-cols-1'>
                    {notes.map((note) => (
                        <Link key={note.id} href={`/${note.owner}/notes/${note.id}`}>
                            <a>
                                <div className='bg-neutral-800 m-1 p-1.5 outline-teal-500 hover:outline hover:outline-1 pl-2 rounded note-height'>
                                    <div className='flex'>
                                        <h1 className='text-xl font-semibold'>{note.title}</h1>
                                        <p className='my-auto'><span className='mx-2'>-</span>{note.owner}</p>
                                    </div>
                                    <p className=''>{note.content}</p>
                                </div>
                            </a>
                        </Link>
                    ))
                    }
                </div>
                <button
                    className='bg-red-500 p-1 rounded-full'
                    type='submit'
                    onClick={signOut}
                >
                    Logout
                </button>
            </div>
        </div>
    );
}