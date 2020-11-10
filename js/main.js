import {Order, storeOrders} from "./components/Order.js";
import Message from "./components/Message.js";

let modalElemForLike = null;
let modalElemForPayment = null;

window.onload = init;

function init() {
    let buttonToOrder = document.querySelector('.js-open-modal');

    let overlay = document.querySelector('.overlay');
    let elements = document.querySelector('.form-order-pizza').elements;
    let form = document.querySelector('.form-order-pizza');
    showElement(form, 'active');

    let message = new Message(() => document.createElement('span'));
    message.addClass('formForMsg');

    // Find value of data-modal attribute in the button
    let modalRef = buttonToOrder.getAttribute('data-modal');

    // Find modal element with the same value of data-modal attribute
    modalElemForPayment = document.querySelector('.modal[data-modal="' + modalRef + '"]');

    // Find modal element with class ".modal" and with value "like" of "data-modal" attribute
    modalElemForLike = document.querySelector('.modal[data-modal="like"]');

    buttonToOrder.addEventListener('click', (event) => {
        event.preventDefault();

        if (!validateCheckboxes(elements)) {
            message.addClass('incorrect');
            message.changeTextContent('Minimum number of selected ingredients is 3!');
            message.deleteClass('deactive')

            document.querySelector('.js-open-modal').before(message.getElement());
        } else {
            showElement(modalElemForPayment, 'active');
            showElement(overlay, 'active');
            hideElement(form, 'active');

            checkPayment().then(() => {
                if (message.haveMessageClass('incorrect')) {
                    message.deleteClass('incorrect');
                }
        
                let objOfValues = getValues(elements);
        
                let newOrder = new Order(objOfValues);
        
                storeOrders.setItem(newOrder);
        
                hideElement(modalElemForPayment, 'active');
                hideElement(overlay, 'active');
                hideElement(form, 'active');
        
                message.changeTextContent('Cooking...');
                message.deleteClass('deactive');
                form .before(message.getElement());

                new Promise((resolve) => {
                    setTimeout(() => {
                        resolve('Deliveryman took your pizza!');
                    }, 3000);
                }).then((msg) => {
                    message.changeTextContent(msg);
                    newOrder.status = 'cooked';

                    return new Promise((resolve) => {
                        setTimeout(() => {
                            resolve('Deliveryman delivered your pizza!');
                        }, 3000)
                    })
                }).then((msg) => {
                    message.changeTextContent(msg);
                    newOrder.status = 'delivered';

                    return new Promise((resolve) => {
                        setTimeout(() => {
                            resolve('deactive');
                        }, 1500);
                    })
                }).then((nameClass) => {
                    message.addClass(nameClass);

                    showElement(modalElemForLike, 'active');
                    showElement(overlay, 'active');
                }).catch(() => {
                    console.error("Error at delivery moment");
                })

                checkLike().then(() => {
                    this.event.preventDefault();

                    hideElement(modalElemForLike, 'active');
                    hideElement(overlay, 'active');

                    message.changeTextContent('Thank You for your feedback!');
                    message.deleteClass('deactive');

                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve('deactive');
                        }, 1500)
                    }).then((nameClass) => {
                        message.addClass(nameClass);

                        showElement(form, 'active');

                        setDefault(elements);
                    }).catch(() => {
                        console.error("Error at setting the form to default after like");
                    })
                }).catch(() => {
                    this.event.preventDefault();

                    hideElement(modalElemForLike, 'active');
                    hideElement(overlay, 'active');

                    message.changeTextContent('Thank You for your feedback!');
                    message.deleteClass('deactive');

                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve('deactive');
                        }, 1500)
                    }).then((nameClass) => {
                        message.addClass(nameClass);

                        showElement(form, 'active');

                        setDefault(elements);
                    }).catch(() => {
                        console.error("Error at setting the form to default after dislike");
                    })
                })
            }).catch(() => {
                hideElement(modalElemForPayment, 'active');
                hideElement(overlay, 'active');
                showElement(form, 'active');
        
                message.addClass('incorrect');
                message.changeTextContent('The payment did not pass!');
                message.deleteClass('deactive');
        
                document.querySelector('.js-open-modal').before(message.getElement());
            })
        }
    });

    overlay.addEventListener('click', function (e) {
        if (modalElemForLike.classList.contains('active')) {
            return;
        } else if (modalElemForPayment.classList.contains('active')) {
            hideElement(modalElemForPayment, 'active');
            hideElement(overlay, 'active');
            showElement(form, 'active');

            return;
        }
    })
}

function checkLike() {
    return new Promise((resolve, reject) => {
        let buttonYesForLike = modalElemForLike.querySelector('#yes-like');
        let buttonNoForLike = modalElemForLike.querySelector('#no-like');

        buttonYesForLike.addEventListener('click', resolve.bind(this));
        buttonNoForLike.addEventListener('click', reject.bind(this));
    })
}

function checkPayment() {
    return new Promise((resolve, reject) => {
        let buttonYes = modalElemForPayment.querySelector('#yes-payment');
        let buttonNo = modalElemForPayment.querySelector('#no-payment');

        buttonYes.addEventListener('click', resolve);
        buttonNo.addEventListener('click', reject);
    })
}

function validateCheckboxes(elements) {
    let valid = true;
    let count = 0;

    [].forEach.call(elements, (item) => {
        if (item.type === 'checkbox' && item.checked) {
            count++;
        }
    })

    if (count < 3) {
        valid = false;
    }

    return valid;
}

function hideElement(element, classHide) {
    element.classList.remove(classHide);
}

function showElement(element, classShow) {
    element.classList.add(classShow);
}

function getValues(elements) {
    let types = ['radio', 'checkbox'];

    let correctInputs = [].filter.call(elements, (item) => types.includes(item.type))
        .filter((item) => item.checked).map( (item) => item.value);
    
    let [size, ...ingredients] = correctInputs;

    return {
        size,
        ingredients,
    }
}

function setDefault(elements) {
    let types = ['radio', 'checkbox'];

    [].forEach.call(elements, (item) => {
        if(types.includes(item.type)) {
            item.checked = false;
            if (item.value === 'medium') {
                item.checked = true
            }
        }
    })
}