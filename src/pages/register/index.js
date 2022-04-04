import Link from 'next/link';
import { useState } from 'react';
import { newUser } from '../api/newUser';
import { userAuth } from '../../utils/firebase';

export default function NewUser(){

	const [user, setUser] = useState({
		email: '',
		password: '',
		checkPassword: ''
	})

	const valueInput = e => setUser({...user, [e.target.name]: e.target.value});

	const register = (e) => {
		e.preventDefault();
		if(user.password !== user.checkPassword){
			alert('Verifique as senhas');
			return
		}
		try{
			newUser(userAuth, user.email, user.password);
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
					<h1 className='text-4xl text-center mt-12 mb-3'>Create new account</h1>
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
							className='rounded-full p-0.5 pl-3 text-black mb-2'
							type='password'
							name='password'
							onChange={valueInput}
                            value={user.password}
						/>
                        <label className='text-lg'>Password</label>
						<input
							className='rounded-full p-0.5 pl-3 text-black'
							type='password'
							name='checkPassword'
							onChange={valueInput}
                            value={user.checkPassword}
						/>
						<Link href='/'>
							<a className='underline text-center mt-3 text-lg'>or login with your account...</a>
						</Link>
						<button
							className='bg-teal-500 hover:bg-teal-600 rounded-full mx-auto w-36 p-1 mt-3'
							type='submit'
							onClick={register}
						>
							Register
						</button>
					</form>
				</div>
			</div>
		</div>
    );
}