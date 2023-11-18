const socket = io('https://mechat-3m7o.onrender.com');
const form = document.getElementById('form');
const msg = document.querySelector('#msg');
const chatbox = document.querySelector('#chat-box');
const welcome = document.querySelector("#welcome")

do{
    Name = prompt("enter Your Name To join");
}while(!Name)

let greet = (text) => {
    let greetElement = document.createElement('h3');
    greetElement.innerText = (` hii ${Name}, ${text}`);
    welcome.append(greetElement);
};

socket.emit('new-user-joined', Name);

greet("Welcome To meChat");


let append = (message, position) => {
    let msgElement = document.createElement('div')
    msgElement.innerText = message
    msgElement.classList.add('msg-box')
    msgElement.classList.add(position)
    chatbox.append(msgElement)
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    var message = msg.value;
    // chatbox.
    append(`you: ${message}`, 'right')
    socket.emit('msg-sent', message)
    msg.value = '';
})

socket.on('user-joined', Name => {
    append(`${Name} joined the chat`, 'left');
})

socket.on('recieve', data => {
    append(`${data.name}:${data.message}`, 'left')
})
