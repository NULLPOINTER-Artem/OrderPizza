import Store from './StoreService.js';

export const storeOrders = new Store();

export class Order {
    constructor({ size = 'medium', ingredients = [], status = 'ordered' }) {
        this.size = size;
        this.ingredients = ingredients;
        this.status = status;
    }

    getSmallOrders() {
        return storeOrders.getItems().filter((item) => item.size === 'small');
    }

    getMediumOrders() {
        return storeOrders.getItems().filter((item) => item.size === 'medium');
    }

    getBigOrders() {
        return storeOrders.getItems().filter((item) => item.size === 'big');
    }

    getOrderedOrders() {
        return storeOrders.getItems().filter( (item) => item.status === 'ordered');
    }

    getCookedOrders() {
        return storeOrders.getItems().filter((item) => item.status === 'cooked');
    }

    getDeliveredOrders() {
        return storeOrders.getItems().filter((item) => item.status === 'delivered');
    } 
}