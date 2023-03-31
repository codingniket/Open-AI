import bot from "./assets/bot.svg";
import user from "./assets/user.svg";

const form = document.querySelector("form");
const chatContainer = document.querySelector("#chat_container");

let loadValue;

function loadMessage(ele) {
  ele.textContent = "";

  loadValue = setInterval(() => {
    ele.textContent += ".";

    if (ele.textContent === "...") {
      ele.textContent = "";
    }
  }, 300);
}

function aiType(ele, text) {
  let index = 0;
  let interval = setInterval(() => {
    if (index < text.length) {
      ele.innerHTML += text.charAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  }, 20);
}

function generateUnique() {
  const timestap = Date.now();
  const ranNumber = Math.random();
  const hexaDecimalString = ranNumber.toString(16);

  return `id-${timestap}-${hexaDecimalString}`;
}

function chatStripe(isAi, value, uniqueId) {
  return `
    <div class="wrapper $(isAi && 'ai')">
      <div class="chat">
        <div class="profile">
          <img src=${isAi ? bot : user} 
          alt="${isAi ? bot : user}" />
        </div>
        <div class="message" id=${uniqueId}> ${value} </div>
      </div>
    </div>
    `;
}

const handleSubmit = async (e) => {
  //  When load form browser reload to solve

  e.preventDefault();

  const data = new FormData(form);

  // User Chat Stripe

  chatContainer.innerHTML += chatStripe(false, data.get("prompt"));

  form.reset();

  // Bot Chat Stripe

  const uniqueId = generateUnique();

  chatContainer.innerHTML += chatStripe(true, " ", uniqueId);

  // to focus scroll to the bottom
  chatContainer.scrollTop = chatContainer.scrollHeight;

  // specific message div
  const messageDiv = document.getElementById(uniqueId);

  loadMessage(messageDiv);
};

form.addEventListener("submit", handleSubmit);
form.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    handleSubmit(e);
  }
});
