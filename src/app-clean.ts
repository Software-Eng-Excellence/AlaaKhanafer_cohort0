//SOLID Principles

export interface Order {
    id: number;
    item: string;
    price: number
}

export class OrderManagement {
    // get and add orders, fetch order
    private orders: Order[] = []
    getOrders(){
        return this.orders;
    }

    addOrder(item: string, price: number){
        Validator.validateOrder(item);
        Validator.validatePrice(price);
        this.orders.push({id: this.orders.length+ + 1, item, price});
    }

    getOrder(id: number){
        return this.getOrders().find(order => order.id === id);
    }
}

export class Validator {
    // this baaden should have its db table, with crud methods for the bussiness owner 
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

    // validate item is possible
    public static validateOrder(item: string){
        if (!this.possibleItems.includes(item)){
            throw new Error(`Invalide item. Must be one of: ${this.possibleItems.join(",")}`);
        }
    }

    //validate price positive
    public static validatePrice(price: number){
        if (price <= 0){
            throw new Error("Price must be greater than zero");
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