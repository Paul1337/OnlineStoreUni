import React from 'react';
import styles from './Form.module.css';

const RegForm = () => {
    return (
        <>
            <div className={'w-full max-w-xs '.concat(styles.form)}>
                <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                    <div className='mb-3'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='username'>
                            Username
                        </label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            type='text'
                            placeholder='Username'
                        />
                    </div>

                    <div className='mb-3'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='username'>
                            Email
                        </label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            type='text'
                            placeholder='Email'
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
                            Password
                        </label>
                        <input
                            className='shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                            type='password'
                            autoComplete='on'
                            // placeholder='******************'
                        />
                        <p className='text-red-500 text-xs italic'>Please choose a password.</p>
                    </div>
                    <div className='mb-3'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
                            Repeat password
                        </label>
                        <input
                            className='shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                            type='password'
                            autoComplete='on'
                            // placeholder='******************'
                        />
                        <p className='text-red-500 text-xs italic'>Please repeat a password.</p>
                    </div>
                    <div className='flex items-center justify-between'>
                        <button
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                            type='button'
                        >
                            Register
                        </button>
                    </div>
                </form>
                <p className='text-center text-gray-500 text-xs'>
                    &copy;2023 Paul. All rights reserved.
                </p>
            </div>
        </>
    );
};

export default RegForm;
