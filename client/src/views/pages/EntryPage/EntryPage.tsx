import React from 'react';

const formStyles: React.CSSProperties = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
};

const EntryPage = () => {
    return (
        <>
            <div className='w-full max-w-xs' style={formStyles}>
                <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='username'>
                            Username
                        </label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            id='username'
                            type='text'
                            placeholder='Username'
                        />
                    </div>
                    <div className='mb-6'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
                            Password
                        </label>
                        <input
                            className='shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                            id='password'
                            type='password'
                            autoComplete='on'
                            // placeholder='******************'
                        />
                        <p className='text-red-500 text-xs italic'>Please choose a password.</p>
                    </div>
                    <div className='flex items-center justify-between'>
                        <button
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                            type='button'
                        >
                            Sign In
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

export default EntryPage;
