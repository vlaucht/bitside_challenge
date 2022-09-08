import {Basket} from "./basket";

export class User {
    #id: number;
    readonly #basket: Basket;

    constructor(id: number) {
        this.#id = id;
        this.#basket = new Basket();
    }

    get basket(): Basket {
        return this.#basket;
    }
}