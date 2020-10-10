window.onload = init;

function init() {
    let buttonToOrder = document.querySelector('.js-open-modal');

    let overlay = document.querySelector('.overlay');
    let elements = document.querySelector('.form-order-pizza').elements;
    let form = document.querySelector('.form-order-pizza');

    let message = document.createElement('span');
    message.classList.add('formForMsg');


    buttonToOrder.addEventListener('click', function(event) {
        event.preventDefault();

        if (!validateCheckboxes(elements)) {
            message.classList.add('incorrect');
            message.textContent = "Minimum number of selected ingredients is 3!";
            message.classList.remove('deactive');

            document.querySelector('.js-open-modal').before(message);
            return;
        }

        // Find value of data-modal attribute in the button
        let modalRef = this.getAttribute('data-modal');

        // Find modal element with the same value of data-modal attribute
        let modalElemForPayment = document.querySelector('.modal[data-modal="' + modalRef + '"]');

        // Add needed classes for show our modal form
        modalElemForPayment.classList.add('active');
        overlay.classList.add('active');

        // Find buttons "yes" and "No" in the modal form 
        let buttonYes = modalElemForPayment.querySelector('#yes-payment');
        let buttonNo = modalElemForPayment.querySelector('#no-payment');

        // Find modal element with class ".modal" and with value "like" of "data-modal" attribute
        let modalElemForLike = document.querySelector('.modal[data-modal="like"]');

        buttonYes.onclick = function() {
            if (message.classList.contains('payment') || message.classList.contains('incorrect')) {
                message.classList.remove('payment');
                message.classList.remove('incorrect');
            }

            let objOfValues = getValues(elements);

            let newOrder = new Order(objOfValues);

            storeOrders.setItem(newOrder);

            hideModalElement(modalElemForPayment, 'active');
            hideModalElement(overlay, 'active');

            form.classList.add('hide');

            message.textContent = 'Cooking...';
            message.classList.remove('deactive');
            form.before(message);

            setTimeout(function() {
                message.textContent = 'Deliver took your pizza!';
            }, (3 * 1000));

            newOrder.status = 'cooked';

            setTimeout(function() {
                message.textContent = 'Deliver delivered your pizza!';
            }, (5 * 1000));

            newOrder.status = 'delivered';

            setTimeout(function() {
                message.classList.add('deactive');
                showModalElement(modalElemForLike, 'active');
                showModalElement(overlay, 'active');
            }, (7 * 1000));

            let buttonYesForLike = modalElemForLike.querySelector('#yes-like');
            let buttonNoForLike = modalElemForLike.querySelector('#no-like');

            buttonYesForLike.onclick = function () {
                hideModalElement(modalElemForLike, 'active');
                hideModalElement(overlay, 'active');

                message.textContent = "Thank You for your feedback!";
                message.classList.remove('deactive');


                setTimeout(function() {
                    message.classList.add('deactive')
                    form.classList.remove('hide');
                }, (3 * 1000));

                setDefault(elements);
            };

            buttonNoForLike.onclick = function () { 
                hideModalElement(modalElemForLike, 'active');
                hideModalElement(overlay, 'active');

                message.textContent = "Thank You for your feedback!";
                message.classList.remove('deactive');


                setTimeout(function () {
                    message.classList.add('deactive')
                    form.classList.remove('hide');
                }, (3 * 1000));

                setDefault(elements);
            };
        }

        buttonNo.addEventListener('click', function(e) {
            e.preventDefault();

            hideModalElement(modalElemForPayment, 'active');
            hideModalElement(overlay, 'active');

            message.classList.add('payment');
            message.textContent = "The payment did not pass!";
            message.classList.remove('deactive');

            document.querySelector('.js-open-modal').before(message);
        })

        overlay.addEventListener('click', function (e) {
            if (modalElemForLike.classList.contains('active')) {
                return;
            } else if (modalElemForPayment.classList.contains('active')) {
                hideModalElement(modalElemForPayment, 'active');
                hideModalElement(overlay, 'active');
                return;
            }
        })
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

function hideModalElement(element, classHide) {
    element.classList.remove(classHide);
}

function showModalElement(element, classShow) {
    element.classList.add(classShow);
}

function getValues(elements) {
    let types = ['radio', 'checkbox'];

    let correctInputs = [].filter.call(elements, (item) => types.includes(item.type))
        .filter((item) => item.checked).map( (item) => item.value);
    
    [size, ...ingredients] = correctInputs;

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