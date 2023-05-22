import React, { useEffect } from 'react';
import styles from './ShopPage.module.css';
import { ProductList } from '../../../models/state/product/product';
import { RootState, useAppDispatch } from '../../../store';
import { useSelector } from 'react-redux';
import { fetchProducts } from '../../../reducers/store/storeSlice';
import { useNavigate } from 'react-router-dom';
import { fixUrl } from '../../../utils/urlUtils';
import ProductCard from '../../components/ProductCard/ProductCard';

const ShopPage = () => {
    const dispatch = useAppDispatch();
    const store = useSelector((state: RootState) => state.store);
    const navigate = useNavigate();

    const products = store.products;

    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    return (
        <div className='flex-1 overflow-y-auto text-center'>
            {products.map((product) => (
                <ProductCard key={product.id} {...product} />
            ))}
        </div>
    );
};

export default ShopPage;
