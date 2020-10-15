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
                setTimeout(function () {
                    resolve(nameClass);
                    this.message.classList.add(nameClass);
                }.bind(this), time);
            })
        } 
    }

    deleteClass(nameClass, time = null) {
        if (!time) {
            this.message.classList.remove(nameClass);
        } else {
            return new Promise((resolve) => {
                setTimeout.call(this, function () {
                    resolve(nameClass);
                    this.message.classList.remove(nameClass);
                }.bind(this), time);
            })
        }
    }

    changeTextContent(textContent, time = null) {
        if (!time) {
            this.message.textContent = textContent;
        } else {
            return new Promise((resolve) => {
                setTimeout(function () {
                    resolve(textContent);
                    this.message.textContent = textContent;
                }.bind(this), time);
            })
        }
    }

    haveMessageClass(nameClass) {
        return this.message.classList.contains(nameClass);
    }
}