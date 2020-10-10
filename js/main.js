window.onload = init;

function init() {
    let buttonToOrder = document.querySelector('.js-open-modal');
    let overlay = document.querySelector('.overlay');

    buttonToOrder.addEventListener('click', function(event) {
        event.preventDefault();

        let modalId = this.getAttribute('data-modal');
        let modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');

        modalElem.classList.add('active');
        overlay.classList.add('active');

        let buttonYes = modalElem.querySelector('#yes-payment');
        let buttonNo = modalElem.querySelector('#no-payment');

        overlay.addEventListener('click', function (e) {
            modalElem.classList.remove('active');
            overlay.classList.remove('active');
        })

        buttonYes.addEventListener('click', function(e) {
            e.preventDefault();

            let modalElemForLike = document.querySelector('.modal[data-modal="like"]');
            let form = document.querySelector('.form-order-pizza').elements;

            let objOfValues = getValues(form);

            let newOrder = new Order(objOfValues);

            storeOrders.setItem(newOrder);

            modalElem.classList.remove('active');
            overlay.classList.remove('active');

            document.querySelector('.form-order-pizza').classList.add('hide');

            let cook = document.createElement('span');
            cook.classList.add('formForMsg');
            cook.textContent = 'Cooking...';
            
            document.querySelector('.form-order-pizza').before(cook);

            setTimeout(function() {
                cook.textContent = 'Deliver took your pizza!';
            }, (3 * 1000));

            newOrder.status = 'cooked';

            setTimeout(function() {
                cook.textContent = 'Deliver delivered your pizza!';
            }, (5 * 1000));

            newOrder.status = 'delivered';

            setTimeout(function() {
                cook.classList.add('deactive');
                modalElemForLike.classList.add('active');
                overlay.classList.add('active');
            }, (7 * 1000));

            let buttonYesForLike = modalElemForLike.querySelector('#yes-like');
            let buttonNoForLike = modalElemForLike.querySelector('#no-like');

            buttonYesForLike.addEventListener('click', function(e) {
                e.preventDefault();

                
            });
        })

        buttonNo.addEventListener('click', function(e) {
            e.preventDefault();

            modalElem.classList.remove('active');
            overlay.classList.remove('active');
        })
    })
}


function getValues(form) {
    let types = ['radio', 'checkbox'];

    let correctInputs = [].filter.call(form, (item) => types.includes(item.type))
        .filter((item) => item.checked).map( (item) => item.value);
    
    [size, ...ingredients] = correctInputs;

    return {
        size,
        ingredients,
    }
}