import React from 'react';
import styles from './ShopPage.module.css';

const products: IStoreItem[] = [
    {
        id: 0,
        title: 'product-test',
        description: 'product-description',
        img: 'img',
        price: 99,
    },
    {
        id: 1,
        title: 'product-test 2',
        description: 'some descr',
        img: 'img',
        price: 99,
    },
    {
        id: 2,
        title: 'product-test 3',
        description: 'description again',
        img: 'img',
        price: 299,
    },
    {
        id: 3,
        title: 'product-test 4',
        description: 'description',
        img: 'img',
        price: 399,
    },
];

const ShopPage = () => {
    return (
        <div className={styles.productCont}>
            {products.map((product) => (
                <div className={styles.product + ' bg-gray-200'} key={product.id}>
                    <div className={styles.product__title}>{product.title}</div>
                    <img src={product.img} alt='image not found' className={styles.product__img} />
                    <div className={styles.product__descr}>{product.description}</div>
                    <div className={styles.product__price}>{product.price} р.</div>
                </div>
            ))}
        </div>
    );
};

export default ShopPage;
