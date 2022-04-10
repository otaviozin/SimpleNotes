import Link from 'next/link';
import Router from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { signIn } from './api/signIn';
import { userAuth } from '../utils/firebase';
import { verifyComplete } from './api/complete';

export default function SignIn(){

    useEffect(() => {
        onAuthStateChanged(userAuth, (user) => {
			if(user){
				// Logged
				//const uid = user.uid;
				const completed = verifyComplete(user.email);
				if(completed){
					Router.push('/home');
				}
				else{
					Router.push('/register/end');
				}
			}
        });
    }, []);

	const [user, setUser] = useState({
		email: '',
		password: ''
	});

	const valueInput = e => setUser({...user, [e.target.name]: e.target.value});

	const login = (e) => {
		e.preventDefault();
		try{
			signIn(userAuth, user.email, user.password);
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
						<i className='fa-regular fa-note-sticky text-4xl lg:text-15xl my-auto'></i>
						<h1 className='lg:text-8xl text-4xl font-semibold'>Simple Notes</h1>
					</div>
				</div>
				<div className='bg-neutral-900 h-fit lg:py-28 text-white'>
					<h1 className='text-4xl text-center mt-12 mb-3'>Login with your account</h1>
					<form className='grid w-64 lg:w-96 mx-auto text-left'>
						<label className='text-lg'>Email</label>
						<input
							className='rounded-full p-0.5 pl-3 text-black mb-2'
							type='email'
							name='email'
							onChange={valueInput}
                            value={user.email}
						/>
						<label className='text-lg'>Password</label>
						<input
							className='rounded-full p-0.5 pl-3 text-black'
							type='password'
							name='password'
							onChange={valueInput}
                            value={user.password}
						/>
						<Link href='/register'>
							<a className='underline text-center mt-3 text-lg'>or create account...</a>
						</Link>
						<button
							className='bg-teal-500 hover:bg-teal-600 rounded-full mx-auto w-36 p-1 mt-3'
							type='submit'
							onClick={login}
						>
							Login
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
