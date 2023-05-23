import React, { FunctionComponent } from 'react';
import { IBasketItemProps } from '../../../models/props/basketItem';
import { fixUrl } from '../../../utils/urlUtils';

const BasketItem: FunctionComponent<IBasketItemProps> = ({
    title,
    img,
    price,
    onDeleteClick,
    onClick,
    count,
    onCountChange,
}) => {
    return (
        <div
            onClick={onClick}
            className='flex cursor-pointer hover:border-white justify-between m-2 p-2 bg-slate-400 border rounded items-center border-black'
        >
            <div className='w-32'>
                <div
                    className='bg-cover bg-center w-20 h-20'
                    style={{ backgroundImage: `url(${fixUrl(img)})` }}
                ></div>
                <span className='text-center text-lg'>
                    <span>Цена: </span>
                    <span className='font-bold'>{price * count}руб.</span>
                </span>
            </div>
            <span className='text-center text-lg my-2' onClick={(e) => e.stopPropagation()}>
                Продукт <span className='font-bold'>{title}</span>
                <span className='ml-2'>
                    <span className='text-xl'>&times;</span>
                    <input
                        type='number'
                        className='w-16 p-1 m-1 rounder border border-black outline-none font-bold'
                        value={count}
                        onChange={onCountChange}
                    />
                </span>
            </span>
            <span
                onClick={(e) => {
                    e.stopPropagation();
                    onDeleteClick(e);
                }}
                className='border rounded relative w-10 h-10 cursor-pointer hover:bg-slate-500'
            >
                <span className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl text-white'>
                    &times;
                </span>
            </span>
        </div>
    );
};

export default BasketItem;
