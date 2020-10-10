window.onload = init;

function init() {
    let buttonToOrder = document.querySelector('.js-open-modal');
    let overlay = document.querySelector('.overlay');
    let elements = document.querySelector('.form-order-pizza').elements;

    let message = document.createElement('span');
    message.classList.add('formForMsg');

    buttonToOrder.addEventListener('click', function(event) {
        event.preventDefault();

        let modalId = this.getAttribute('data-modal');
        let modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');

        modalElem.classList.add('active');
        overlay.classList.add('active');

        let buttonYes = modalElem.querySelector('#yes-payment');
        let buttonNo = modalElem.querySelector('#no-payment');
        let modalElemForLike = document.querySelector('.modal[data-modal="like"]');

        buttonYes.addEventListener('click', function(e) {
            e.preventDefault();

            message.classList.remove('deactive');

            let objOfValues = getValues(elements);

            let newOrder = new Order(objOfValues);

            storeOrders.setItem(newOrder);

            modalElem.classList.remove('active');
            overlay.classList.remove('active');

            document.querySelector('.form-order-pizza').classList.add('hide');

            message.textContent = 'Cooking...';
            
            document.querySelector('.form-order-pizza').before(message);

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
                modalElemForLike.classList.add('active');
                overlay.classList.add('active');
            }, (7 * 1000));

            let buttonYesForLike = modalElemForLike.querySelector('#yes-like');
            let buttonNoForLike = modalElemForLike.querySelector('#no-like');

            buttonYesForLike.addEventListener('click', function(e) {
                e.preventDefault();

                modalElemForLike.classList.remove('active');
                overlay.classList.remove('active');

                message.textContent = "Thank You for your feedback!";
                message.classList.remove('deactive');


                setTimeout(function() {
                    message.classList.add('deactive')
                    document.querySelector('.form-order-pizza').classList.remove('hide');
                }, (3 * 1000));

                setDefault(elements);
            });

            buttonNoForLike.addEventListener('click', function (e) {
                e.preventDefault();

                modalElemForLike.classList.remove('active');
                overlay.classList.remove('active');

                message.textContent = "Thank You for your feedback!";
                message.classList.remove('deactive');


                setTimeout(function () {
                    message.classList.add('deactive')
                    document.querySelector('.form-order-pizza').classList.remove('hide');
                }, (3 * 1000));

                setDefault(elements);
            });
        })

        buttonNo.addEventListener('click', function(e) {
            e.preventDefault();

            modalElem.classList.remove('active');
            overlay.classList.remove('active');

            message.textContent = "The payment did not pass!";

            document.querySelector('.js-open-modal').before(message);
        })

        overlay.addEventListener('click', function (e) {
            modalElem.classList.remove('active');
            overlay.classList.remove('active');
        })
    })
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
                console.log(item);
                item.checked = true
            }
        }
    })
}