import { io } from 'socket.io-client';

const socket = io('http://localhost:8000');

var audio = new Audio("./Notification.mp3");
const container = document.getElementById("messages");
const input = document.getElementById("input");

document.getElementById("form").addEventListener("submit", onsubmitHandler);

function onsubmitHandler(e) {
    e.preventDefault();
    const message = input.value;
    append(`<strong>You</strong> : ${message}`, "right");
    socket.emit("send", message);
    input.value = "";
}

const userName = prompt("Enter your name : ");
socket.emit('user-joined', userName);
input.focus();

const append = (message, position) => {
    const messageEl = document.createElement("li");
    messageEl.innerHTML = message;
    messageEl.classList.add(position);
    container.appendChild(messageEl);
    if (position == "left") {
        audio.play();
    }
    let scrollHeight = document.getElementById("messages").scrollHeight;
    document.getElementById("messages").scrollTop = scrollHeight + 100;


}

socket.on('user-joined', name => {
    append(`<strong>${name}</strong> joined the chat`, "right");
});

socket.on('receive', data => {
    append(`<strong>${data.name} </strong> : ${data.message}`, "left");
});

socket.on('leave', name => {
    append(`<strong>${name} </strong> left the chat`, "left");
})