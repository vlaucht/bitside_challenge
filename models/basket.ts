import {Product} from "./product";
import {BasketItem} from "./basketItem";

export class Basket {
    readonly #items: BasketItem[];

    constructor() {
        this.#items = [];
    }

    scan(item: Product) {
        this.#items.push(new BasketItem(item));
    }

    get items(): BasketItem[] {
        return this.#items;
    }

    get total(): number {
        const sum = this.#items.reduce((acc, obj) => {
            return acc + obj.price;
        }, 0);
        return Math.round(sum * 100) / 100;
    }

    get checkout(): number {
        const sum = this.#items.reduce((acc, obj) => {
            return obj.isCounted ?  acc + obj.checkOutPrice : acc;
        }, 0);
        return Math.round(sum * 100) / 100;
    }
}