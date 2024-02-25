import React from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center my-7 font-semibold'>Sign up</h1>
      <form className='flex flex-col gap-4'>
        <input type = "text" placeholder ="Username" 
        className='border p-3 rounded-lg' id='username'></input>
        <input type = "email" placeholder ="Email" 
        className='border p-3 rounded-lg' id='email'></input>
        <input type = "password" placeholder ="Password" 
        className='border p-3 rounded-lg' id='password'></input>
        <button className='bg-sky-600 p-3 rounded-lg uppercase text-white
        hover:opacity-90 disabled:opacity-70'>sign up</button>
      </form>
      <div className='flex gap-3 mt-4'>
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
    </div>
  )
}
