import Navbar from '../../components/Navbar';
import Image from 'next/image';
import Router from 'next/router';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { userAuth } from '../../utils/firebase';
import { verifyComplete } from '../api/complete';
import { getUser } from '../api/getUser';
import { getUserNotes } from '../api/getNotes';

export default function Profile(){

    const route = useRouter();
    const [profile, setProfile] = useState({
        uid: '',
        displayName: '',
        name: '',
        email: '',
        phoneNum: ''
    });
    const [userImg, setUserImg] = useState('https://cdn.iconscout.com/icon/free/png-256/user-1648810-1401302.png');
    const [notes, setNotes] = useState([]);
    const [authed, setAuthed] = useState('');

    // Auth verify
    useEffect(() => {
        if(!route.isReady) return;

        const data = async () => {
            const res = await getUser(route.query.profile)
            setProfile(res[0]);
            if(res[0].photoUrl!==null) setUserImg(res[0].photoUrl);
        }
        data();

        const noteData = async () => {
            const res = await getUserNotes(profile.displayName);
            setNotes(res);
        }
        noteData();

        onAuthStateChanged(userAuth, (user) => {
			if(user){
				// Logged
				//const uid = user;
				const completed = verifyComplete(user.email);
				if(completed){
                    setAuthed(user.uid);
                    return;
				}
				else{
                    Router.push('/register/end');
				}
			}
        });
    }, [route.isReady, route.query, profile.displayName]);

    if(userImg==='') return;
    
    return(
        <div className='bg-neutral-900 h-screen'>
            <div className='bg-neutral-900 h-max text-white font-varela'>
                <Navbar />
                <div className='grid grid-cols-3 lg:grid-cols-10 items-center mt-5 mx-5 lg:mx-20 text-center'>
                    <Image
                        className='rounded-full object-contain'
                        src={userImg}
                        priority='true'
                        width={128}
                        height={128}
                        alt='Profile photo'
                    />
                    <div>
                        <h1 className='text-2xl font-medium'>{profile.name}</h1>
                        <p className='text-xl font-light text-gray-500'>@{profile.displayName}</p>
                    </div>
                    {(authed === profile.uid) ? (
                        <Link href={`${profile.displayName}/settings`}>
                            <a className='text-2xl text-teal-500 hover:text-teal-600 lg:col-span-8 lg:text-right'>
                                <i className='fa-solid fa-gear'></i>
                            </a> 
                        </Link>
                    ) : ('')}
                </div>
                <div className='grid mt-5'>
                    <h1 className='text-2xl'>Notes by {profile.displayName}</h1>
                    {notes.map((note) => (
                        <Link key={note.id} href={`/${profile.displayName}/notes/${note.id}`}>
                            <a>
                                <div className='bg-neutral-800 m-1 p-1.5 outline-teal-500 hover:outline hover:outline-1 pl-2 rounded note-height'>
                                    <div className='flex'>
                                        <h1 className='text-xl font-light'>{note.title}</h1>
                                        <p className='my-auto text-gray-500'><span className='mx-2'>-</span>{note.owner}</p>
                                    </div>
                                    <p className=''>{note.content}</p>
                                </div>
                            </a>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}