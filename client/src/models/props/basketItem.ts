import { IBasketProductItem } from '../state/basket/basket';
import { IProductItem } from '../state/product/product';

export interface IBasketItemProps extends IBasketProductItem {
    onDeleteClick: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
    onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    onCountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
