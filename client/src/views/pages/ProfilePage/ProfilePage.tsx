import React, { FunctionComponent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../store';
import { IUserDataComponentProps } from '../../../models/props/profilePage';

import styles from './ProfilePage.module.css';
import { Navigate, useNavigate } from 'react-router-dom';
import BasketItem from '../../components/BasketItem/BasketItem';
import basketSlice from '../../../reducers/basket/basketSlice';
import OrderItem from '../../components/OrderItem/OrderItem';
import { tryOrder } from '../../../reducers/user/userSlice';
import { IProductItem } from '../../../models/state/product/product';

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
        <div className={styles.userData.concat(' ', 'm-2')}>
            <UserDataItem label='Пользователь' value={name} />
            <UserDataItem label='Email' value={email} />
            <UserDataItem label='Баланс' value={balance.toString()} />
        </div>
    );
};

enum ViewType {
    Basket,
    Orders,
}

const ProfilePage = () => {
    const [viewType, setViewType] = useState(ViewType.Basket);
    const basketState = useSelector((state: RootState) => state.basket);
    const userState = useSelector((state: RootState) => state.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    if (!userState.data) {
        return <Navigate to='/entry' />;
    }

    const handleBasketClick = () => setViewType(ViewType.Basket);
    const handleOrdersClick = () => setViewType(ViewType.Orders);

    const handleOrderClick = () => {
        dispatch(
            tryOrder({
                items: basketState.products.map((basketItem) => ({
                    count: basketItem.count,
                    id: basketItem.id,
                    price: basketItem.price,
                })),
            })
        ).then((data) => {
            console.log(data);
            if (data.type === 'user/tryOrder/fulfilled') {
                dispatch(basketSlice.actions.emptyBasket());
            }
        });
    };

    const calculateBasketSum = () => {
        return basketState.products.reduce((acc, cur) => acc + cur.price * cur.count, 0);
    };

    return (
        <div className={styles.cont}>
            <div className={styles.leftPart}>
                <UserDataComponent {...userState.data} />

                <div className='my-2'>
                    <button
                        onClick={handleBasketClick}
                        className={
                            'm-1.5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                        }
                    >
                        Корзина
                    </button>
                    <button
                        onClick={handleOrdersClick}
                        className='m-1.5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                    >
                        Заказы
                    </button>
                </div>
            </div>
            {(() => {
                if (viewType === ViewType.Basket) {
                    return (
                        <div className={styles.rightPart.concat(' ', 'bg-slate-300 p-2 m-2')}>
                            <h1 className='text-2xl underline'>Корзина</h1>
                            <div className={styles.rightPartCont}>
                                {basketState.products.length > 0 ? (
                                    basketState.products.map((product) => (
                                        <BasketItem
                                            key={product.id}
                                            {...product}
                                            onDeleteClick={() => {
                                                dispatch(basketSlice.actions.removeItem(product.id));
                                            }}
                                            onClick={() => {
                                                navigate(`/products/${product.id}`);
                                            }}
                                            onCountChange={(e) => {
                                                if (Number(e.target.value) < 1) return;
                                                dispatch(
                                                    basketSlice.actions.updateItemCount({
                                                        id: product.id,
                                                        count: Number(e.target.value),
                                                    })
                                                );
                                            }}
                                        />
                                    ))
                                ) : (
                                    <p className='text-lg my-2'>В корзине пусто!</p>
                                )}
                            </div>
                            {basketState.products.length > 0 && (
                                <button
                                    className='bg-slate-500 py-2 text-white'
                                    onClick={handleOrderClick}
                                >
                                    Оформить заказ за {calculateBasketSum()} руб.
                                </button>
                            )}
                        </div>
                    );
                } else if (viewType === ViewType.Orders) {
                    return (
                        <div className={styles.rightPart.concat(' ', 'bg-slate-300 p-2 m-2')}>
                            <h1 className='text-2xl underline'>Заказы</h1>
                            <div className={styles.rightPartCont}>
                                {userState.orders ? (
                                    userState.orders.map((order, index) => (
                                        <OrderItem {...order} key={index} />
                                    ))
                                ) : (
                                    <div>Заказы загружаются...</div>
                                )}
                            </div>
                        </div>
                    );
                }
                return <></>;
            })()}
        </div>
    );
};

export default ProfilePage;
