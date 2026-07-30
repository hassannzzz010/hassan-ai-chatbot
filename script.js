async function sendMessage() {

    let input = document.getElementById("user-input");
    let message = input.value.trim();

    if (message === "") return;

    let chatBox = document.getElementById("chat-box");

    // User message
    let userDiv = document.createElement("div");
    userDiv.className = "user-message";
    chatBox.scrollTop =
chatBox.scrollHeight;
    userDiv.innerText = message;
    chatBox.appendChild(userDiv);saveChat();

    input.value = "";

    // Typing indicator
    let typingDiv = document.createElement("div");
    typingDiv.className = "bot-message";
    chatBox.scrollTop =
chatBox.scrollHeight;
    typingDiv.id = "typing";
    typingDiv.innerHTML = `
<span>.</span>
<span>.</span>
<span>.</span>
`;
    chatBox.appendChild(typingDiv);saveChat();

    chatBox.scrollTop = chatBox.scrollHeight;

    try {

        const response = await fetch("http://127.0.0.1:5000/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message
            })
        });

        const data = await response.json();

        typingDiv.remove();

        let botDiv = document.createElement("div");
        botDiv.className = "bot-message";
        chatBox.scrollTop =
chatBox.scrollHeight;
        botDiv.innerText = data.reply;

        chatBox.appendChild(botDiv);saveChat();

    } catch (error) {

        typingDiv.innerText =
            "Connection error. Backend not running.";

        console.error(error);
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}

document.getElementById("user-input")
.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        sendMessage();
    }

});
function saveChat() {
    localStorage.setItem(
        "chatHistory",
        document.getElementById("chat-box").innerHTML
    );
}

window.onload = function () {
    const history = localStorage.getItem("chatHistory");

    if (history) {
        document.getElementById("chat-box").innerHTML = history;
    }
};
document.getElementById("clear-btn")
.addEventListener("click", () => {

    localStorage.removeItem("chatHistory");

    document.getElementById("chat-box").innerHTML = "";

});
document.getElementById("new-chat-btn")
.addEventListener("click", () => {

    localStorage.removeItem("chatHistory");

    document.getElementById("chat-box").innerHTML = "";

});
document.getElementById("new-chat-btn")
.addEventListener("click", () => {

    localStorage.removeItem("chatHistory");

    document.getElementById("chat-box").innerHTML = "";

});

document.getElementById("clear-btn")
.addEventListener("click", () => {

    localStorage.removeItem("chatHistory");

    document.getElementById("chat-box").innerHTML = "";

});
document.getElementById("status").innerText =
"🟡 Thinking...";
document.getElementById("status").innerText =
"🟢 Online";
document.getElementById("status").innerText =
"🟢 Online";