import Navbar from '../../../components/Navbar';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getUserNote } from '../../api/userNote';

export default function Note(){

    const route = useRouter();
    const [note, setNote] = useState({
        title: '',
        content: '',
        owner: '',
        date: ''
    });

    useEffect(()=>{
        if(!route.isReady) return;

        const res = async () => {
            const data = await getUserNote(route.query.note);
            setNote({
                title: data.title,
                content: data.content,
                owner: data.owner,
                date: data.date
            });
        }
        res();

        
    }, [route.isReady, route.query.note]);

    return(
        <div className='bg-neutral-900 h-screen'>
            <div className='bg-neutral-900 h-max font-varela text-white'>
                <Navbar />
                <div className='m-3'>
                    <h1 className='text-2xl'>{note.title} - <Link href={`/${note.owner}`}><a className='hover:text-teal-500'>{note.owner}</a></Link></h1>
                    <p className='tracking-wider text-slate-200'>{note.content}</p>
                </div>
            </div>
        </div>
    );
}