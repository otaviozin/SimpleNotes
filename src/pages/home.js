import Router from 'next/router';
import { useEffect } from 'react';
import { logOut } from './api/signOut';
import { onAuthStateChanged } from 'firebase/auth';
import { userAuth } from '../utils/firebase';
import { verifyComplete } from './api/complete';

export default function Home(){
    
    useEffect(() => {
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
        <div>
            <h1>Hello - Home Page</h1>
            <button
                className='bg-red-500 p-1 text-white rounded-full'
                type='submit'
                onClick={signOut}
            >
                Logout
            </button>
        </div>
    );
}