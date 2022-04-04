import Router from 'next/router';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { userAuth } from '../../utils/firebase';
import { verifyComplete } from '../api/complete';
import { completeAcc } from '../api/setAccount';

export default function End(){

    const [user, setUser] = useState({
        name: '',
        username: ''
    });

	const valueInput = e => setUser({...user, [e.target.name]: e.target.value});

    useEffect(() => {

        onAuthStateChanged(userAuth, (user) => {
            if(!user){
                Router.push('/')
            }
            else{
                verifyComplete(user.email);
            }
        });
    }, []);

    const setAccount = (e) => {
        e.preventDefault();
        const auth = userAuth;
        const email = userAuth.currentUser.email;
        try{
            completeAcc(auth, email, user.name, user.username);
        }
        catch(error){
            console.log(error);
        }
    }
    
    return(
        <div className='bg-neutral-900 h-screen'>
			<div className='grid lg:grid-cols-2 lg:h-screen font-varela'>
				<div className='bg-teal-500 lg:text-center p-2 lg:py-32'>
					<div className='lg:grid flex justify-center gap-3'>
						<i className='far fa-sticky-note text-4xl lg:text-15xl my-auto font-semibold'></i>
						<h1 className='lg:text-8xl text-4xl font-semibold'>Simple Notes</h1>
					</div>
				</div>
				<div className='bg-neutral-900 h-fit lg:py-28 text-white'>
					<h1 className='text-4xl text-center mt-12 mb-3'>Complete your account</h1>
					<form className='grid w-64 lg:w-96 mx-auto text-left'>
						<label className='text-lg'>Name</label>
						<input
							className='rounded-full p-0.5 pl-3 text-black mb-2'
							type='text'
							name='name'
                            onChange={valueInput}
                            value={user.name}
						/>
						<label className='text-lg'>Username</label>
						<input
							className='rounded-full p-0.5 pl-3 text-black input-fixed-text'
							type='text'
							name='username'
                            onChange={valueInput}
                            value={user.username}
						/>
						<button
							className='bg-teal-500 hover:bg-teal-600 rounded-full mx-auto w-36 p-1 mt-5'
							type='submit'
                            onClick={setAccount}
						>
							Complete
						</button>
					</form>
				</div>
			</div>
		</div>
    );
}