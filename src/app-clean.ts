//SOLID Principles

export interface Order {
    id: number;
    item: string;
    price: number
}

interface IValidator {
    validate(order: Order): void;
}

export class OrderManagement {
    // get and add orders, fetch order
    private orders: Order[] = []
    getOrders(){
        return this.orders;
    }

    addOrder(item: string, price: number){
        const order: Order = {id: this.orders.length + 1, item, price}
        new Validator().validate(order);
        this.orders.push(order);
    }

    getOrder(id: number){
        return this.getOrders().find(order => order.id === id);
    }
}

export class Validator implements IValidator{
    private rules: IValidator[] = [
        new ItemValidator(),
        new PriceValidator(),
        new MaxPriceValidator(),
    ]
    validate(order: Order): void {
        this.rules.forEach(rule => rule.validate(order));
    }
}

class ItemValidator implements IValidator {
    private static possibleItems = [
        "Sponge",
        "Chocolate",
        "Fruit",
        "Red Velvet",
        "Birthday",
        "Carrot",
        "Marble",
        "Coffee",
      ];

    validate(order: Order) {
        if (!ItemValidator.possibleItems.includes(order.item)) {
            throw new Error(`Invalid item. Must be one of: ${ItemValidator.possibleItems.join(",")}`);
        }
    }
}

class PriceValidator implements IValidator {
    validate(order: Order) {
        if (order.price <= 0) {
            throw new Error("Price must be greater than zero");
        }
    }
}

class MaxPriceValidator implements IValidator{
    validate(order: Order) {
        if (order.price > 100) {
            throw new Error("Price must be less than 100");
        }
    }
}

export class FinanceCalculator {
    // calculate total rev and avg buy power
    public static getRevenue(orders: Order[]){
        return orders.reduce((total, order) => total + order.price, 0); 
        //reduce: is like shrinking all objects, and every project we're taking from the Order array we're summing its price with the total (summation of prices of previous order' items)
    }
    public static getAverageBuyPower(orders: Order[]){
        return orders.length === 0 ? 0 : this.getRevenue(orders) / orders.length;
    }
}