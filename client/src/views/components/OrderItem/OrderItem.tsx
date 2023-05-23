import React, { FunctionComponent } from 'react';
import { IOrderItemProps } from '../../../models/props/orderItem';
import { fixUrl } from '../../../utils/urlUtils';

const OrderItem: FunctionComponent<IOrderItemProps> = ({ price, date, products }) => {
    return (
        <div className='flex justify-between flex-col items-center p-2 m-2 border rounded bg-blue-200'>
            <div className='flex justify-between w-full items-center m-1'>
                <div className='text-lg'>{new Date(date).toLocaleString().replace(',', '')}</div>
                <div className='text-lg font-bold'>{price} руб.</div>
            </div>
            <div className='flex-1 p-1.5'>
                {products.map((product) => (
                    <div key={product.item.id} className='border p-1.5 rounded m-1 bg-blue-300'>
                        <div>
                            <div
                                className='bg-cover bg-center w-20 h-20 m-auto'
                                style={{ backgroundImage: `url(${fixUrl(product.item.img)})` }}
                            ></div>
                            <span className='text-center text-lg'>
                                <span>Цена: </span>
                                <span className='font-bold'>{product.item.price} руб.</span>
                            </span>
                        </div>
                        <span className='text-center text-lg my-2'>
                            Продукт <span className='font-bold'>{product.item.title}</span>
                            <span className='ml-2'>Количество: {product.count}</span>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderItem;
