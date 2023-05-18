import React, { useEffect } from 'react';
import styles from './ShopPage.module.css';
import { ProductList } from '../../../models/product/product';
import { RootState, useAppDispatch } from '../../../store';
import { useSelector } from 'react-redux';
import { fetchProducts } from '../../../reducers/store/storeSlice';
import { useNavigate } from 'react-router-dom';

// const products: ProductList =

const ShopPage = () => {
    const dispatch = useAppDispatch();
    const store = useSelector((state: RootState) => state.store);
    const navigate = useNavigate();

    const products = store.products;

    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    return (
        <div className={styles.productCont}>
            {products.map((product) => (
                <div className={styles.product} key={product.id}>
                    <div className={styles.product__title}>{product.title}</div>
                    <img src={product.img} alt='image not found' className={styles.product__img} />
                    {/* <div className={styles.product__descr}>{product.description}</div> */}
                    <div className={styles.product__price}>{product.price} р.</div>
                    <button
                        onClick={() => {
                            navigate(`/products/${product.id}`);
                        }}
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                    >
                        перейти
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ShopPage;
