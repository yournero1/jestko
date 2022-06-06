"use strict";
const noMessagesEl = document.querySelector(".noMessages"); //Список пуст
const messagesEl = document.querySelector(".messages"); //Блок где будет вылезать список
const numInput = document.querySelector(".numInput"); //Куда будем писать число
const textInput = document.querySelector(".textInput"); //Куда будем писать текст
const errorNumInput = document.querySelector(".errorNumInput"); //ошибка для числа
const errorTextInput = document.querySelector(".errorTextInput"); //ошибка для текста
const sendBtn = document.querySelector(".send"); //кнопка отправить
const clearBtn = document.querySelector(".clear"); //кнопка очистить
let messages = [];
const messageElClassName = "message";
sendBtn.addEventListener("click", function () {
    if (numInput.value === "") {
        errorNumInput.textContent = "Введите номер записи.";
        return;
    } else {
        errorNumInput.textContent = "";
    }
    if (textInput.value === "") {
        errorTextInput.textContent = "Введите название записи.";
        return;
    } else {
        errorTextInput.textContent = "";
    }
    hideNoMessagesText();
    const candidate = messages.find(e => e.number === numInput.value)

   if(!candidate){
       messages.push({
           text: textInput.value,
           number: numInput.value,
       });
       messages.sort(function (a,b){
           if(a.number > b.number)return 1
           if(a.number < b.number)return -1
           return 0
       })
       const messageElems = document.querySelectorAll("." + messageElClassName);
       messageElems.forEach(function (message) {
           message.remove();
       });
       if (messages.length <= 3) {
           messages.forEach((e) => {
               const messageMarkup = getMessagesMarkup(e.number, e.text);
               messagesEl.insertAdjacentHTML("beforeend", messageMarkup);
           });
       } else {
           let firsItem = messages.slice(0,1)
           let lastItems = messages.slice(-3)
           let newMessages = firsItem.concat(lastItems)
           newMessages.forEach((e) => {
               const messageMarkup = getMessagesMarkup(e.number, e.text);
               messagesEl.insertAdjacentHTML("beforeend", messageMarkup);
           });
       }
       console.log(messages)
   }
});

function getMessagesMarkup(number, text) {
    return `<div style='display:flex;font-weight: 400;
    font-size: 32px;
    line-height: 38px;' class='${messageElClassName}'>
    <div style='padding-right:5px;'>${number})</div><div>${text}</div>
    </div>`;
}

function hideNoMessagesText() {
    noMessagesEl.style.display = "none";
}

clearBtn.addEventListener("click", function () {
    showNoMessages();
    numInput.value = "";
    textInput.value = "";
    messages = []
    const messageElems = document.querySelectorAll("." + messageElClassName);
    messageElems.forEach(function (message) {
        message.remove();
    });
});

function showNoMessages() {
    noMessagesEl.style.display = "block";
}
