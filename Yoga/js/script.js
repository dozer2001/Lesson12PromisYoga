window.addEventListener('DOMContentLoaded', function () {
    'use strict';


    let allTabs = document.querySelectorAll('.info-header-tab'),
        tabsHeader = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');


    function HideAllContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    HideAllContent(1);

    function ShowAllContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    tabsHeader.addEventListener('click', function (event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < allTabs.length; i++) {
                if (target === allTabs[i]) {
                    HideAllContent(0);
                    ShowAllContent(i);
                    break;
                }
            }
        }
    });

// Timer
    let deadLiner = '2018-10-19';

    function getTimeRemaining(endTime) {
        let t = Date.parse(endTime) - Date.parse(new Date()),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor(( t / (1000 * 60 * 60)));
        if (hours < 10) {
            hours = '0' + hours;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (seconds < 10) {
            seconds = '0' + seconds;
        }

        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function setClock(id, endTime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);


        function updateClock() {
            let t = getTimeRemaining(endTime);
            hours.textContent = t.hours;
            minutes.textContent = t.minutes;
            seconds.textContent = t.seconds;

            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '0' + '0';
                minutes.textContent = '0' + '0';
                seconds.textContent = '0' + '0';
            }
        }
    }

    setClock('timer', deadLiner);
// Timer
// Scroll
    let li = document.getElementsByTagName('li');
    let ul = document.querySelector('.container'),
        contacts = document.getElementById('contacts'),
        price = document.getElementById('price'),
        photo = document.getElementById('photo'),
        about = document.getElementById('about');

    ul.addEventListener('click', function (event) {
        event.preventDefault();
        let target = event.target;
        if (event.target.hash) {
            let poz = document.querySelector(target.hash).getBoundingClientRect();
            if (poz.top < 0) {
                requestAnimationFrame(scrollUp);
            } else {
                requestAnimationFrame(scrollDown);
            }
        }


        function scrollUp() {
            let poz = document.querySelector(target.hash).getBoundingClientRect();
            if (poz.top < 0) {
                scrollBy(0, -50);
                requestAnimationFrame(scrollUp);
            }
        }

        function scrollDown() {
            let poz = document.querySelector(target.hash).getBoundingClientRect();
            if (poz.top > 0) {
                scrollBy(0, 50);
                requestAnimationFrame(scrollDown);
            }
        }
    });
    // Scroll end


    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
        description = document.getElementsByClassName('description-btn'),
        info = document.querySelector('.info');

    info.addEventListener('click', function (event) {
        let target = event.target;
        if (target.className === 'description-btn') {
            overlay.style.display = 'block';
            this.classList.add('more-splash');
            document.body.style.overflow = 'hidden';
        }
    });

    more.addEventListener('click', function () {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', function () {
        overlay.style.display = 'none';
        this.classList.remove('more-splash');
        document.body.style.overflow = '';
    });


    //Form
    let message = {
        loading: 'Загрузка..',
        success: 'Спасибо!Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так..',
        numbers: 'Введите числа  в строку "номер телефона"',

    };

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div'),
        img = document.createElement('img');


    function SendForm(elem) {
       let  elemOne = elem;
        let form = document.querySelector(`${elemOne}`),
            input = form.getElementsByTagName('input');
       form.addEventListener('submit', function (event) {
            event.preventDefault();
            form.appendChild(statusMessage);
           form.appendChild(img);
            let formData = new FormData(form);

            function postData() {
                return new Promise(function (resolve, reject) {
                    let request = new XMLHttpRequest();
                    request.open('POST', 'server.php');
                    request.setRequestHeader('Content-Type', 'application/x-ww-form-urlencoded');

                    request.onreadystatechange = function () {
                        if (request.readyState < 4) {
                            resolve();
                            console.log(1);
                        } else if (request.readyState === 4 && request.status === 200) {
                            resolve();
                        } else {
                            reject();
                        }
                    };
                    request.send(formData);
                })
            }// End PostData
            function clearInput() {
                for (let i = 0; i < input.length; i++) {
                    input[i].value = '';
                }
            }

            postData(FormData)
                .then(() => {
                    img.src = "img/callBack.jpg";
                    img.style.paddingLeft = "17%";
                    img.style.paddingTop = "10px";
                    img.style.height = "30%"
                })
                .catch(() => img.src = "img/dog2.jpg")
                .then(clearInput)
        });
    }

    SendForm('.main-form');
    SendForm('.contact-form');


    //Form END


    //Contanct Form
    let contactFrom = document.querySelector('.contact-form'),
        contactInput = contactFrom.getElementsByTagName('input');

    //
    // contactFrom.addEventListener('submit', function (event) {
    //     event.preventDefault();
    //     contactFrom.appendChild(img);
    //
    //     let formData = new FormData(contactFrom);
    //
    //
    //     function formBottom() {
    //         return new Promise(function (resolve, reject) {
    //             let request = new XMLHttpRequest();
    //             request.open('POST', 'server.php');
    //             request.setRequestHeader('Content-Type', 'application/x-ww-form-urlencoded');
    //             request.readystatechange = function () {
    //                 if (request.readyState < 4) {
    //                     resolve();
    //                 } else if (request.readyState === 4 && request.status === 200) {
    //                     resolve();
    //                 } else {
    //                     reject();
    //                 }
    //             };
    //             request.send(formData);
    //         });
    //     }
    //
    //     function clearBottomnput() {
    //         for (let i = 0; i < contactInput.length; i++) {
    //             contactInput[i].value = '';
    //             console.log(1);
    //         }
    //     }
    //
    //     formBottom(formData)
    //         .then(() => statusMessage.innerHTML = message.loading)
    //         .then(() => {
    //             img.src = "img/callBack.jpg";
    //             img.style.paddingLeft = "17%";
    //         })
    //         .catch(() => img.src = "img/dog2.jpg")
    //         .then(clearBottomnput)
    //
    //
    // });
});
    function cislo(event) {

        if (event.which != 43 && event.which < 48 || event.which > 57 || event.which == 8)
            event.preventDefault();
    }