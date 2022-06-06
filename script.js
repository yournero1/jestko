'use strict'
const noMessagesEl = document.querySelector('.noMessages'); //Список пуст
const messagesEl = document.querySelector('.messages'); //Блок где будет вылезать список
const numInput = document.querySelector('.numInput'); //Куда будем писать число
const textInput = document.querySelector('.textInput'); //Куда будем писать текст
const errorNumInput = document.querySelector('.errorNumInput'); //ошибка для числа
const errorTextInput = document.querySelector('.errorTextInput'); //ошибка для текста
const sendBtn = document.querySelector('.send'); //кнопка отправить
const clearBtn = document.querySelector('.clear'); //кнопка очистить

const messageElClassName = 'message';
sendBtn.addEventListener('click', function() {
    if (numInput.value === '') {
        errorNumInput.textContent = 'Введите номер записи.';
        return;
    } else {
        errorNumInput.textContent = '';
    }
    if (textInput.value === '') {
        errorTextInput.textContent = 'Введите название записи.';
        return;
    } else {
        errorTextInput.textContent = '';
    }
    hideNoMessagesText();

    const messageMarkup = getMessagesMarkup(numInput.value, textInput.value);
    messagesEl.insertAdjacentHTML('beforeend', messageMarkup);

});

function getMessagesMarkup(number, text) {
    return `<div style='display:flex;font-weight: 400;
    font-size: 32px;
    line-height: 38px;' class='${messageElClassName}'>
    <div style='padding-right:5px;'>${number})</div><div>${text}</div>
    </div>`;
};

function hideNoMessagesText() {
    noMessagesEl.style.display = 'none';
};

clearBtn.addEventListener('click', function() {
    showNoMessages();
    numInput.value = '';
    textInput.value = '';
    const messageElems = document.querySelectorAll('.' + messageElClassName);
    messageElems.forEach(function(message) {
        message.remove();
    })
})

function showNoMessages() {
    noMessagesEl.style.display = 'block';
};