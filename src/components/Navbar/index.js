import Link from 'next/link';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { userAuth } from '../../utils/firebase';

export default function Navbar(){

    const [userPath, setUser] = useState('');

    useEffect(() => {
        onAuthStateChanged(userAuth, (user) => {
            setUser(user.displayName);
        });
    }, []);

    return(
        <div className='bg-neutral-800 p-3 flex justify-evenly'>
            <Link href='/home'>
                <a><i className='fa-solid fa-house text-teal-500 hover:text-teal-600 text-2xl'></i></a>
            </Link>
            <Link href='/new'>
                <a><i className='fa-solid fa-note-sticky text-teal-500 hover:text-teal-600 text-2xl'></i></a>
            </Link>
            <Link
                href={{
                    pathname: '/[user]',
                    query: { user: userPath },
                }}
            >
                <a><i className='fa-solid fa-user text-teal-500 hover:text-teal-600 text-2xl'></i></a>
            </Link>
        </div>
    );
}