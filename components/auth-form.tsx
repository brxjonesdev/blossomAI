'use client';
import React from 'react';

export default function AuthForm({ mode }: { mode: string }) {
  if (mode === 'login') {
    return (
      <form className='flex flex-col space-y-4'>
        <label htmlFor='email'>Email</label>
        <input type='email' id='email' />
        <label htmlFor='password'>Password</label>
        <input type='password' id='password' />
        <button type='submit'>Login</button>
      </form>
    );
  } else if (mode === 'signup') {
    return (
      <form className='flex flex-col space-y-4'>
        <label htmlFor='email'>Email</label>
        <input type='email' id='email' />
        <label htmlFor='password'>Password</label>
        <input type='password' id='password' />
        <button type='submit'>Signup</button>
      </form>
    );
  }
}
