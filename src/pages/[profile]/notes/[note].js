import Navbar from '../../../components/Navbar';
import Link from 'next/link';
import { userAuth } from '../../../utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { getUserNote } from '../../api/userNote';
import { likeNote, undoLike } from '../../api/likeNote';
import { getUser } from '../../api/getUser';

export default function Note(){

    const route = useRouter();
    const [note, setNote] = useState({
        title: '',
        content: '',
        owner: '',
        date: ''
    });

    const [profile, setProfile] = useState({});
    const [liked, setLiked] = useState([]);
    const [starClass, setStar] = useState('far fa-star');
    
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
        const data = async () => {
            const res = await getUser(route.query.profile);
            setLiked(res[0].liked);
        }
        data();

        onAuthStateChanged(userAuth, (user) => {
            if(user){
                // Logged
				//const uid = user;
                setProfile(user);
			}
        });
        
    }, [route]);
    
    const handleClass = (e) => {
        e.preventDefault();
        if(starClass==='far fa-star'){
            likeNote(route.query.note, profile.email);
            setStar('fas fa-star');
        }
        else{
            undoLike(route.query.note, profile.email);
            setStar('far fa-star');
        }
    }

    return(
        <div className='bg-neutral-900 h-screen'>
            <div className='bg-neutral-900 h-max font-varela text-white'>
                <Navbar />
                <div className='m-3'>
                    <h1 className='text-2xl'>{note.title} - <Link href={`/${note.owner}`}><a className='hover:text-teal-500'>{note.owner}</a></Link></h1>
                    <p className='tracking-wider text-slate-200'>{note.content}</p>
                    <div className='flex justify-evenly text-2xl mt-5'>
                        <i className='fa-regular fa-comment hover:text-teal-500 cursor-pointer'></i>
                        <i
                            className={`${starClass} hover:text-teal-500 cursor-pointer`}
                            onClick={handleClass}
                        ></i>
                    </div>
                </div>
            </div>
        </div>
    );
}