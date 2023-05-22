import React, { FunctionComponent } from 'react';
import styles from './ProductCard.module.css';
import { fixUrl } from '../../../utils/urlUtils';
import { useNavigate } from 'react-router-dom';
import { IProductCardProps } from '../../../models/props/productCard';

const ProductCard: FunctionComponent<IProductCardProps> = ({ id, title, img, price, categoryName }) => {
    const navigate = useNavigate();

    return (
        <div
            className={styles.product.concat(
                ' max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'
            )}
            key={id}
        >
            <div
                className={styles.categoryBadge.concat(
                    ' ',
                    'text-red-700 font-bold text-lg border-solid border p-1 px-2 border-red-700 bg-yellow-200'
                )}
            >
                {categoryName}
            </div>
            <div className='text-center text-2xl mb-2'>{title}</div>
            {img && (
                <div
                    style={{
                        backgroundImage: `url(${fixUrl(img)})`,
                    }}
                    className={styles.product__img}
                ></div>
            )}
            <div className='font-bold my-1'>{price} р.</div>
            <button
                onClick={() => {
                    navigate(`/products/${id}`);
                }}
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            >
                перейти
            </button>
        </div>
    );
};

export default ProductCard;
