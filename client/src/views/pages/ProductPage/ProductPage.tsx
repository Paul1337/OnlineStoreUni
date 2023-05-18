import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../../store';
import { IProductItem } from '../../../models/state/product/product';

const ProductPage = () => {
    const { id } = useParams();
    const products = useSelector((state: RootState) => state.store.products);
    const product = products.find((product: IProductItem) => product.id === Number(id));

    if (!product) return <>Some error!</>;

    return (
        <div>
            <h1 className='text-center text-3xl font-bold'>{product.title}</h1>

            <p>Описание товара:</p>
            <p>{product.description}</p>

            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                Добавить в корзину
            </button>
            <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>
                Купить
            </button>
        </div>
    );
};

export default ProductPage;
