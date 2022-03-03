import { Order } from "../Interfaces/Order";

//Por compras superiores a 200.000, se le adiciona una caja de sorpresa totalmente gratis
export const validateAdditionSurpriseBox = (order: Order): string => {
    let total: number = order.products.reduce( (totalOrder, item) =>{
        const currentTotal = totalOrder += item.unitPrice * item.quantity;
        return currentTotal
    }, 0);
    if (total > 200000) {
        return "Congratulations!!! He takes a surprise box"
    } else {
        return "Sorry, you need more purchases to get a surprise box"
    }
}