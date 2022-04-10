import Link from 'next/link';

export default function Navbar(){
    return(
        <div className='bg-neutral-800 p-3 flex justify-evenly'>
            <Link href='/home'>
                <a><i className='fa-solid fa-house text-teal-500 hover:text-teal-600 text-2xl'></i></a>
            </Link>
            <Link href='/new'>
                <a><i className='fa-solid fa-note-sticky text-teal-500 hover:text-teal-600 text-2xl'></i></a>
            </Link>
            <Link href='#'>
                <a><i className='fa-solid fa-user text-teal-500 hover:text-teal-600 text-2xl'></i></a>
            </Link>
        </div>
    );
}