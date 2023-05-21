import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../../store';
import { IProductItem } from '../../../models/state/product/product';

import styles from './ProductPage.module.css';
import { fixUrl } from '../../../utils/urlUtils';
import basketSlice from '../../../reducers/basket/basketSlice';

const ProductPage = () => {
    const { id } = useParams();
    const products = useSelector((state: RootState) => state.store.products);
    const product = products.find((product: IProductItem) => product.id === Number(id));
    const basketState = useSelector((state: RootState) => state.basket);
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    if (!product) return <>Some error!</>;

    const imgStyles = {
        backgroundImage: `url(${fixUrl(product.img)})`,
    };

    const partStyles = styles.part.concat(
        ' ',
        'p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'
    );

    const isInBasket = basketState.products.map((product) => product.id).includes(Number(id));
    const handlePutInBasketClick = () => {
        dispatch(
            basketSlice.actions.putItem({
                ...product,
                count: 1,
            })
        );
    };

    return (
        <div className={styles.page}>
            <h1 className='text-center text-4xl underline'>{product.title}</h1>
            <div className={styles.main}>
                <div className={styles.part}>
                    <div className={styles.productImage} style={imgStyles}></div>
                </div>
                <div className={partStyles}>
                    <p className='text-2xl'>Описание товара:</p>
                    <p className='text-2xl my-2 bg-slate-300 p-3 rounded'>{product.description}</p>

                    <div>
                        {isInBasket ? (
                            <span
                                onClick={() => navigate('/')}
                                className='py-2 px-4 m-1.5 text-xl text-green-600 font-bold underline cursor-pointer
                                '
                            >
                                В корзине
                            </span>
                        ) : (
                            <button
                                onClick={handlePutInBasketClick}
                                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-1.5 rounded'
                            >
                                Добавить в корзину
                            </button>
                        )}
                        <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 m-1.5 rounded'>
                            Купить
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
