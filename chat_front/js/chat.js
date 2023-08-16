const evemtSource = new EventSource("http://localhost:8082/sender/ssar/receiver/cos");
evemtSource.onmessage = (event)=>{
    console.log(1, event);
    const data = JSON.parse(event.data);
    console.log(2, data);
    initMessage(data);
}


function getSendMsgBox(msg, time){
    return `<div class="sent_msg">
    <p>${msg}</p> 
    <span class="tiem_date"> ${time} </span> 
</div>`;
}

function initMessage(data){
    let chatBox = document.querySelector("#chat-box");
    let msgInput = document.querySelector("#chat-outgoing-msg");

    let chatOutgoinBox = document.createElement("div");
    chatOutgoinBox.className = "outgoing-msg";

    chatOutgoinBox.innerHTML = getSendMsgBox(data.message,data.createdAt);
    chatBox.append(chatOutgoinBox);
    msgInput.value = "";
}

async function addMessage(){
    let chatBox = document.querySelector("#chat-box");
    let msgInput = document.querySelector("#chat-outgoing-msg");

    let chatOutgoinBox = document.createElement("div");
    chatOutgoinBox.className = "outgoing-msg";

    let date = new Date();
    let now = date.getHours() + ":" + date.getMinutes() + " | " + date.getMonth() + "/" + date.getDate();

    let chat = {
        sender : "ssar",
        receiver : "cos",
        message: msgInput.value
    };

    let response = await fetch("http://localhost:8082/chat",{
        method:"post", 
        body:JSON.stringify(chat),
        headers: {
            "Content-type" : "application/json; charset=utf-8"
        }
    })

    chatOutgoinBox.innerHTML = getSendMsgBox(msgInput.value, now);
    chatBox.append(chatOutgoinBox);
    msgInput.value = "";

    console.log(response);

    let parseResponse = await response.json();

    console.log(parseResponse);
}

document.querySelector("#chat-send").addEventListener("click", ()=> {
    addMessage();
})

document.querySelector("#chat-outgoing-msg").addEventListener("keydown", (e)=>{
    console.log(e.keyCode );
    if(e.keyCode == 13){
        addMessage();
    }
})