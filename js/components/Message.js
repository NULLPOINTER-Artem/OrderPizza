export default class Message {
    constructor(messageElem, textContent = '') {
        this.message = messageElem();
        this.message.textContent = textContent;
    }

    getElement() {
        return this.message;
    }

    addClass(nameClass, time = null) {
        if (!time) {
            this.message.classList.add(nameClass);
        } else {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(nameClass);
                }, time);
            }).then((nameClass) => {
                this.message.classList.add(nameClass);
            }).catch(() => {
                console.error('Error with Promise');
            })
        } 
    }

    deleteClass(nameClass, time = null) {
        if (!time) {
            this.message.classList.remove(nameClass);
        } else {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(nameClass);
                }, time);
            }).then((nameClass) => {
                this.message.classList.remove(nameClass);
            }).catch(() => {
                console.error('Error with Promise');
            })
        }
    }

    changeTextContent(textContent, time = null) {
        if (!time) {
            this.message.textContent = textContent;
        } else {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(textContent);
                }, time);
            }).then((textContent) => {
                this.message.textContent = textContent;
            }).catch(() => {
                console.error('Error with Promise');
            })
        }
    }

    haveMessageClass(nameClass) {
        return this.message.classList.contains(nameClass);
    }
}