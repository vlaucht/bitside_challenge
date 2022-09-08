import {User} from "./models/user";
import {Product} from "./models/product";

const INVENTORY: Product[] = [];
INVENTORY.push(new Product("A0001", 12.99));
INVENTORY.push(new Product("A0002", 3.99));
INVENTORY.push(new Product("A0003", 5.99));


class Main {
    #user: User;
    constructor(id: number) {
       this.#user = new User(id);
    }

    addItem(identifier: string): this {
        const product = INVENTORY.find(i => i.name.toLowerCase() === identifier.toLowerCase());
        if (!product) throw new Error("Product not found.")
        this.#user.basket.scan(product);
        return this;
    }

    checkTotal(): number {
        return this.#user.basket.total;
    }

    checkOut(): number {
        return this.#user.basket.checkout;
    }

    applyDealOneFree(identifier: string): this {
        let count = 0;
        this.#user.basket.items.map((value) => {
            if (value.name.toLowerCase() === identifier.toLowerCase()) {
                count++;
                if (count % 2 === 0) value.isCounted = false;
            }
            return value;
        });
        return this;
    }

    applyDealDiscount(identifier: string, percentage: number): this {
        this.#user.basket.items.map((el) => {
            if (el.name.toLowerCase() === identifier.toLowerCase()) {
                return el.checkOutPrice *= 1- (percentage/ 100);
            }
        });
        return this;
    }
}

/**
 * Test cases
 */
let sum;
let main;
// 1. One Element free
main = new Main(1);
main.addItem("A0001").addItem("A0001").addItem("A0001");
sum = main.applyDealOneFree("A0001").checkOut();
console.log(`${sum} == ${(INVENTORY[0].price) * 2}`)

// 2.  User can still check original values
sum = main.checkTotal();
console.log(`${sum} == ${(INVENTORY[0].price) * 3}`)

// 3. appy discount to certain item
main = new Main(2);
main.addItem("A0001").addItem("A0002").addItem("A0003");
sum = main.applyDealDiscount("a0002", 10).checkOut();
console.log(`${sum} == ${(INVENTORY[0].price + (INVENTORY[1].price * 0.9) + INVENTORY[2].price).toFixed(2)}`);

// 4. offers can be chained
main = new Main(3);
main.addItem("A0001").addItem("A0002").addItem("A0002");
sum = main.applyDealDiscount("a0001", 10).applyDealOneFree("A0002").checkOut();
console.log(`${sum} == ${((INVENTORY[0].price * 0.9) + INVENTORY[1].price).toFixed(2)}`);