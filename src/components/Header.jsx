import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className='bg-sky-300 shadow-md'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
            <Link to='/'>
            <h1 className='font-bold text-xl sm:text-2xl flex flex-wrap'>
                <span className='text-sky-700'>Apple</span>
                <span className='text-sky-950'>Estate</span>
            </h1>
            </Link>
            <form className='bg-sky-200 p-3 rounded-md flex items-center'>
                <input type='text' placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64'></input>
                <FaSearch className='text-sky-950 '/>
            </form>
            <ul className='flex gap-4'>
                  <Link to='/'><li className='font-medium hidden text-xl sm:inline  text-sky-700 hover:underline'>Home</li></Link>
                  <Link to='/about'><li className='font-medium text-xl hidden sm:inline  text-sky-700 hover:underline'>About</li></Link>
                  <Link to='/sign-in'><li className='font-medium text-xl text-sky-700 hover:underline'>Sign in</li></Link>
            </ul>
        </div>
        
            
    </header>
  )
}
