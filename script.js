function sendMessage() {

    let input = document.getElementById("user-input");
    let message = input.value.trim();

    if (message === "") return;

    let chatBox = document.getElementById("chat-box");

    // User Message
    let userDiv = document.createElement("div");
    userDiv.className = "user-message";
    userDiv.innerText = message;
    chatBox.appendChild(userDiv);

    input.value = "";

    // Typing message
    let typingDiv = document.createElement("div");
    typingDiv.className = "bot-message";
    typingDiv.id = "typing";
    typingDiv.innerText = "AI is typing...";
    chatBox.appendChild(typingDiv);

    chatBox.scrollTop = chatBox.scrollHeight;

    setTimeout(() => {

        typingDiv.remove();

        let botDiv = document.createElement("div");
        botDiv.className = "bot-message";

        let msg = message.toLowerCase();

        if (msg.includes("hello") || msg.includes("hi")) {
            botDiv.innerText = "Assalamualaikum! Main Hassan's AI hoon 👋";
        }
        else if (msg.includes("name")) {
            botDiv.innerText = "Mera naam Hassan's AI hai.";
        }
        else if (msg.includes("time")) {
            botDiv.innerText = new Date().toLocaleTimeString();
        }
        else if (msg.includes("date")) {
            botDiv.innerText = new Date().toLocaleDateString();
        }
        else {
            botDiv.innerText = "Abhi main simple chatbot hoon. Jaldi AI banne wala hoon 😎";
        }

        chatBox.appendChild(botDiv);
        chatBox.scrollTop = chatBox.scrollHeight;

    }, 1200);
}

document.getElementById("user-input")
.addEventListener("keypress", function(event){
    if(event.key === "Enter"){
        sendMessage();
    }
});