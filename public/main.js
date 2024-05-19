const socket = io();

const fileInput = document.getElementById('fileInput');
const sendFileButton = document.getElementById('sendFile');
const messagesDiv = document.getElementById('messages');

let localConnection;
let remoteConnection;
let sendChannel;
let receiveChannel;

sendFileButton.addEventListener('click', () => {
    const file = fileInput.files[0];
    if (file) {
        sendFile(file);
    }
});

function sendFile(file) {
    const reader = new FileReader();
    reader.onload = (event) => {
        const arrayBuffer = event.target.result;
        socket.emit('file', { name: file.name, data: arrayBuffer });
    };
    reader.readAsArrayBuffer(file);
}

socket.on('file', (file) => {
    const arrayBuffer = file.data;
    const blob = new Blob([arrayBuffer]);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;
    link.textContent = `Download ${file.name}`;
    messagesDiv.appendChild(link);
    messagesDiv.appendChild(document.createElement('br'));
});
