
function getTime(){

    const now = new Date();

    return now.toLocaleTimeString([],{
        hour:'2-digit',
        minute:'2-digit'
    });

}
async function sendMessage() {

    let input = document.getElementById("user-input");
    let message = input.value.trim();

    if (message === "") return;
    hideWelcome();
    closeMobileMenu();

    let chatBox = document.getElementById("chat-box");
    let status = document.getElementById("status");

    // User message
    let userDiv = document.createElement("div");

userDiv.className = "message-row user-row";

userDiv.innerHTML = `
<div class="avatar user-avatar">U</div>

<div>

<div class="user-message">
${message}
</div>

<div class="message-time">
${getTime()}
</div>

</div>
`;

chatBox.appendChild(userDiv);

    input.value = "";

    saveChat();


    // Thinking status
    if(status){
        status.innerText = "🟡 Thinking...";
    }


    // Typing animation
    let typingDiv = document.createElement("div");

    typingDiv.className = "bot-message";
    typingDiv.id = "typing";

    typingDiv.innerHTML = `
        <span>.</span>
        <span>.</span>
        <span>.</span>
    `;

    chatBox.appendChild(typingDiv);

    chatBox.scrollTop = chatBox.scrollHeight;


    try {

        const response = await fetch(
            "https://hassannzzz010.pythonanywhere.com/chat",
            {
                method: "POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body: JSON.stringify({
                    message: message
                })
            }
        );


        const data = await response.json();


        typingDiv.remove();


       let botDiv = document.createElement("div");

botDiv.className = "message-row";

botDiv.innerHTML = `
<div class="avatar bot-avatar">AI</div>

<div>

<div class="bot-message">
${data.reply}
</div>

<div class="message-time">
${getTime()}
</div>

</div>
`;

chatBox.appendChild(botDiv);

        saveChat();


        if(status){
            status.innerText = "🟢 Online";
        }


    } catch(error){


        typingDiv.innerText =
        "Connection error. Backend not responding.";


        console.error(error);


        if(status){
            status.innerText = "🔴 Offline";
        }

    }


    chatBox.scrollTop = chatBox.scrollHeight;

}



// Enter button
document
.getElementById("user-input")
.addEventListener(
"keypress",
function(event){

    if(event.key === "Enter"){

        sendMessage();

    }

});



// Save chat
function saveChat(){

    localStorage.setItem(
        "chatHistory",
        document.getElementById("chat-box").innerHTML
    );

}



// Load chat
window.onload = function(){

    let history =
    localStorage.getItem("chatHistory");


    if(history){

        document.getElementById("chat-box").innerHTML =
        history;
        

    const welcome =
    document.getElementById("welcome-screen");

    if(welcome){

        welcome.style.display = "none";

    

}

    }

};



// Clear Chat
document
.getElementById("clear-btn")
.addEventListener(
"click",
function(){

    localStorage.removeItem("chatHistory");

    document.getElementById("chat-box").innerHTML = "";
    location.reload();

});




// New Chat
document
.getElementById("new-chat-btn")
.addEventListener(
"click",
async function(){


    localStorage.removeItem("chatHistory");

    document.getElementById("chat-box").innerHTML = "";


    // Backend memory clear
    try{

        await fetch(
        "https://hassannzzz010.pythonanywhere.com/new-chat",
        {
            method:"POST"
        });

    }
    catch(error){

        console.log(error);

    }


});
function fillPrompt(text){

    document.getElementById("user-input").value = text;

}

function hideWelcome(){

    const welcome =
    document.getElementById("welcome-screen");

    if(welcome){

        welcome.style.display = "none";

    }

}
const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;

if(SpeechRecognition){

    const recognition =
    new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.onresult =
function(event){

    let transcript = "";

    for(
        let i = 0;
        i < event.results.length;
        i++
    ){

        transcript +=
        event.results[i][0].transcript;

    }

    document.getElementById(
    "user-input"
    ).value = transcript;

};

    recognition.lang = "en-US";

    const micBtn =
    document.getElementById("mic-btn");

    micBtn.addEventListener(
    "click",
    function(){

        recognition.start();

        micBtn.classList.add(
        "listening"
        );

    });

    recognition.onresult =
    function(event){

        document.getElementById(
        "user-input"
        ).value =
        event.results[0][0].transcript;

    };

    recognition.onend =
function(){

    micBtn.classList.remove(
    "listening"
    );

    const text =
    document.getElementById(
    "user-input"
    ).value.trim();

    if(text){

        sendMessage();

    }

};

    };
const sidebarNewChat =
document.getElementById(
"sidebar-new-chat"
);

if(sidebarNewChat){

    sidebarNewChat.addEventListener(
    "click",
    function(){

        document
        .getElementById(
        "new-chat-btn"
        )
        .click();

    });

}
const themeBtn =
document.getElementById(
"theme-toggle"
);

if(themeBtn){

    if(
        localStorage.getItem("theme")
        === "light"
    ){

        document.body.classList.add(
        "light-theme"
        );

        themeBtn.innerText =
        "☀️ Light Mode";

    }

    themeBtn.addEventListener(
    "click",
    function(){

        document.body.classList.toggle(
        "light-theme"
        );

        const isLight =
        document.body.classList.contains(
        "light-theme"
        );

        if(isLight){

            localStorage.setItem(
            "theme",
            "light"
            );

            themeBtn.innerText =
            "☀️ Light Mode";

        }
        else{

            localStorage.setItem(
            "theme",
            "dark"
            );

            themeBtn.innerText =
            "🌙 Dark Mode";

        }

    });

}
/* ===============================
   CHATGPT STYLE MOBILE SIDEBAR
================================ */


const menuBtn = document.getElementById("menu-btn");
const sidebar = document.getElementById("sidebar");


if(menuBtn && sidebar){


menuBtn.addEventListener(
"click",
function(){

    sidebar.classList.toggle("active");

});


}



// Sidebar bahar click karne se close

document.addEventListener(
"click",
function(e){


if(
sidebar &&
sidebar.classList.contains("active") &&
!sidebar.contains(e.target) &&
!menuBtn.contains(e.target)

){

sidebar.classList.remove("active");

}


});





// Sidebar new chat ke baad close

if(sidebarNewChat){

sidebarNewChat.addEventListener(
"click",
function(){

    if(sidebar){

        sidebar.classList.remove("active");

    }

});


}




// Mobile pe message bhejne ke baad sidebar close

async function closeMobileMenu(){

if(
window.innerWidth <= 700 &&
sidebar
){

sidebar.classList.remove("active");

}

}