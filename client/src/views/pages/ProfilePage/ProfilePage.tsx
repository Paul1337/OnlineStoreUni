import React, { FunctionComponent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { IUserDataComponentProps } from '../../../models/props/profilePage';

import styles from './ProfilePage.module.css';
import { Navigate } from 'react-router-dom';

const UserDataItem: FunctionComponent<{ label: string; value: string }> = ({ label, value }) => {
    return (
        <div className='my-1.5 bg-slate-300 p-3 flex justify-between text-xl'>
            <span>{label}: </span>
            <span className='font-bold ml-20'>{value}</span>
        </div>
    );
};

const UserDataComponent: FunctionComponent<IUserDataComponentProps> = ({ balance, name, email }) => {
    return (
        <div className='w-fit m-2'>
            <UserDataItem label='Пользователь' value={name} />
            <UserDataItem label='Email' value={email} />
            <UserDataItem label='Баланс' value={balance.toString()} />
        </div>
    );
};

const ProfilePage = () => {
    const userState = useSelector((state: RootState) => state.user);
    if (!userState.data) {
        return <Navigate to='/entry' />;
    }
    return (
        <div style={{ flex: 1 }}>
            <UserDataComponent {...userState.data} />

            <div className='my-2'>
                <button className='m-1.5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                    Корзина
                </button>
                <button className='m-1.5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                    Заказы
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;
