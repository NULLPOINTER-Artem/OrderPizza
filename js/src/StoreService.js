class Store {
    store;
    constructor(initialStore = []) {
        this.store = initialStore;
    }

    setItem(obj) {
        this.store.push(obj);
    }

    getItems() {
        return this.store;
    }

    showItems() {
        this.store.forEach( (item) => {
            console.log(item);
        })
    }

    getItem(obj) {
        let findObj = this.store.find((item) => item === obj);
        if (!findObj) {
            console.info('There is no such object');
        }

        return findObj;
    }

    showItem(obj) {
        let findObj = this.store.find((item) => item === obj);
        if (!findObj) {
            console.info('There is no such object');
        }

        console.log(findObj);
    }
}