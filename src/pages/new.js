import Navbar from '../components/Navbar';
import Router from 'next/router';
import { userAuth } from '../utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { verifyComplete } from './api/complete';
import { useState, useEffect } from 'react';
import { newNotes } from './api/newNotes';

export default function NewNote(){

    const [note, setNote] = useState({
        title: '',
        content: '',
        owner: '',
    });

    useEffect(() => {
        onAuthStateChanged(userAuth, (user) => {
			if(user){
				// Logged
				//const uid = user;
                setNote({owner: user.displayName});
				const completed = verifyComplete(user.email);
				if(completed){
					Router.push('/new');
				}
				else{
					Router.push('/register/end');
				}
			}
        });
    }, []);

	const valueInput = e => setNote({...note, [e.target.name]: e.target.value});

    const postNote = () => {
        try{
            newNotes(note.title, note.content, note.owner);
            Router.push('/home');
        }
        catch(error){
            //console.log(error);
        }
    } 

    return(
        <div className='bg-neutral-900 h-screen'>
            <div className='bg-neutral-900 h-max text-white font-varela'>
                <Navbar />
                <form className='grid w-80 lg:w-auto mx-auto mt-6 lg:m-6'>
                    <label>Title</label>
                    <input
                        className='p-1 pl-3 lg:w-96 border border-teal-500 rounded bg-neutral-800 placeholder:text-neutral-400 placeholder:italic'
                        placeholder='Market list'
                        maxLength={30}
                        type='text'
                        name='title'
                        onChange={valueInput}
                        value={note.title}
                    />
                    <label className='mt-3'>Content</label>
                    <textarea
                        className='p-1 px-3 border border-teal-500 rounded bg-neutral-800 placeholder:text-neutral-400 placeholder:italic min-h-[280px]'
                        maxLength='1024'
                        placeholder='eggs and milk'
                        name='content'
                        onChange={valueInput}
                        value={note.content}
                    />
                    <button
                        className='bg-teal-500 hover:bg-teal-600 p-2 rounded w-32 mx-auto mt-5'
                        type='submit'
                        onClick={postNote}
                    >
                        Post
                    </button>
                </form>
            </div>
        </div>
    );
}