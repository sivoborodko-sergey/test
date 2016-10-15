var username = getParameterByName('username');
var endPointURL = "ws://" + window.location.host + "/chat/" + username;
var chatClient = null;
document.write(endPointURL);

function connect() {
    chatClient = new WebSocket(endPointURL);

    chatClient.onopen = function () {
        chatClient.send("Hello user");
    };

    chatClient.onmessage = function (event) {
        console.log(event);
        var messagesArea = document.getElementById("messages");
        var message = event.data + "\r\n";
        messagesArea.value = messagesArea.value + message;
        messagesArea.scrollTop = messagesArea.scrollHeight;
    };
}

function disconnect() {
    chatClient.close();
}

function sendMessage() {
    var user = document.getElementById("userName").value.trim();
    if (user === "")
        alert("Please enter your name!");

    var inputElement = document.getElementById("messageInput");
    var message = inputElement.value.trim();
    if (message !== "") {
        var jsonObj = user + " : " + message;
        chatClient.send(jsonObj);
        inputElement.value = "";
    }
    inputElement.focus();
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
