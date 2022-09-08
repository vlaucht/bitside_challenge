import {Product} from "./product";

export class BasketItem extends Product {
    isCounted: boolean;
    checkOutPrice: number;
    constructor(item: Product) {
        super(item.name, item.price);
        this.isCounted = true;
        this.checkOutPrice = item.price;
    }
}