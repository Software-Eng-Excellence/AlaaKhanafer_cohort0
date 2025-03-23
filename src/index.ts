import { FinanceCalculator, ItemValidator, MaxPriceValidator, OrderManagement, PriceValidator, Validator } from "./app";
import logger from "./util/logger";

const orders = [
    { id: 1, item: "Sponge", price: 15 },
    { id: 2, item: "Chocolate", price: 20 },
    { id: 3, item: "Fruit", price: 18 },
    { id: 4, item: "Red Velvet", price: 25 },
    { id: 5, item: "Coffee", price: 8 },
  ];
  
const rules = [ 
    new ItemValidator(),
    new PriceValidator(),
    new MaxPriceValidator(),
  ];

const OrderManager = new OrderManagement(new Validator(rules), new FinanceCalculator());
for (const order of orders) {
    OrderManager.addOrder(order.item, order.price);
}
  
  // Adding a new order directly
  const newItem = "Marble";
  const newPrice = 22;
    
  OrderManager.addOrder(newItem, newPrice);
  
  logger.info("Orders after adding a new order: %o", OrderManager.getOrders());
  
  // Calculate Total Revenue directly
  logger.info("Total Revenue:"+ OrderManager.getTotalRevenue());
  
  // Calculate Average Buy Power directly
  logger.info("Average Buy Power:"+ OrderManager.getBuyPower().toFixed(2));
  
  // Fetching an order directly
  const fetchId = 2;
  const fetchedOrder = OrderManager.getOrder(fetchId);
  logger.info("Order with ID 2: %o", fetchedOrder);
  
  // Attempt to fetch a non-existent order
  const nonExistentId = 10;
  const nonExistentOrder = OrderManager.getOrder(nonExistentId);
  logger.info("Order with ID 10 (non-existent):"+ nonExistentOrder);