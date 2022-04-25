import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Router from 'next/router';
import { useRouter } from 'next/router';
import { userAuth } from '../../utils/firebase';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { getUser } from '../api/getUser';
import { verifyComplete } from '../api/complete';
import { updateUser } from '../api/updateUser';

export default function Settings(){
    const route = useRouter();

    const [profile, setProfile] = useState({
        uid: '',
        displayName: '',
        name: '',
        email: '',
        phoneNum: '',
        password: ''
    });
    const [userImg, setUserImg] = useState('https://cdn.iconscout.com/icon/free/png-256/user-1648810-1401302.png');

	const valueInput = e => setProfile({...profile, [e.target.name]: e.target.value});

    const update = async (e) => {
        e.preventDefault();
        updateUser(userAuth, profile.displayName, profile.email);
    };

    useEffect(() => {
        if(!route.isReady) return;

        const data = async () => {
            const res = await getUser(route.query.profile);
            setProfile(res[0]);
            if(res[0].photoUrl!==null) setUserImg(res[0].photoUrl);
        }
        data();

        onAuthStateChanged(userAuth, (user) => {
            if(!user){
                // Not logged
				//const uid = user.uid;
				Router.push('/');
			}
            else{
                verifyComplete(user.email)
            }
        });
    }, [route]);

    if(profile.photoUrl==='') return;

    return(
        <div className='bg-neutral-900 h-screen'>
            <div className='bg-neutral-900 h-max text-white font-varela'>
                <Navbar />
                <div className='grid mt-5'>
                    <Image
                        className='object-contain'
                        src={userImg}
                        height={128}
                        width={128}
                        alt='Profile image'
                    />
                    <form className='grid mx-5'>
                        <label>Name</label>
                        <input
                            className='p-1 pl-3 lg:w-96 border border-teal-500 rounded bg-neutral-800 placeholder:text-neutral-400 placeholder:italic'
                            type='text'
                            name='name'
                            defaultValue={profile.name}
                            onChange={valueInput}
                            value={profile.name}
                        />
                        <label className='mt-3'>Username</label>
                        <input
                            className='p-1 pl-3 lg:w-96 border border-teal-500 rounded bg-neutral-800 placeholder:text-neutral-400 placeholder:italic'
                            type='text'
                            name='displayName'
                            defaultValue={profile.displayName}
                            onChange={valueInput}
                            value={profile.displayName}
                        />
                        <label className='mt-3'>Email</label>
                        <input
                            className='p-1 pl-3 lg:w-96 border border-teal-500 rounded bg-neutral-800 placeholder:text-neutral-400 placeholder:italic'
                            type='email'
                            name='email'
                            defaultValue={profile.email}
                            onChange={valueInput}
                            value={profile.email}
                        />
                        <label className='mt-3'>Phone number</label>
                        <input
                            className='p-1 pl-3 lg:w-96 border border-teal-500 rounded bg-neutral-800 placeholder:text-neutral-400 placeholder:italic'
                            type='number'
                            name='phoneNum'
                            defaultValue={profile.phoneNum}
                            onChange={valueInput}
                            value={profile.phoneNum}
                        />
                        <label className='mt-3'>Password</label>
                        <input
                            className='p-1 pl-3 lg:w-96 border border-teal-500 rounded bg-neutral-800 placeholder:text-neutral-400 placeholder:italic'
                            type='password'
                            name='password'
                            defaultValue={profile.password}
                            onChange={valueInput}
                            value={profile.password}
                        />
                        <button
                            className='bg-teal-500 hover:bg-teal-600 p-2 rounded w-32 mx-auto mt-5'
                            type='submit'
                            onClick={update}
                        >
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}