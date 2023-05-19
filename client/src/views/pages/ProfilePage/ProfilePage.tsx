import React, { FunctionComponent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { IUserDataComponentProps } from '../../../models/props/profilePage';

const UserDataComponent: FunctionComponent<IUserDataComponentProps> = ({ balance }) => {
    return (
        <div>
            Текущий баланс: <span>{balance}</span>
        </div>
    );
};

const ProfilePage = () => {
    const userState = useSelector((state: RootState) => state.user);
    return (
        <div style={{ flex: 1 }}>
            {userState.data && <UserDataComponent {...userState.data} />}
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                Корзина
            </button>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                Заказы
            </button>
        </div>
    );
};

export default ProfilePage;
