const inputQuestion = document.getElementById('chat-input');
const chatForm = document.getElementById('chat-form');
const chatOutput = document.getElementById('chat-output');
const clearButton = document.getElementById('clear-button');

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  sendQuestion();
});

clearButton.addEventListener("click", () => {
  clearChat();
});

const OPEN_API_KEY = "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";

function sendQuestion() {
  const sQuestion = inputQuestion.value.trim();

  if (!sQuestion) {
    return;
  }

  chatOutput.innerHTML += `
    <div class="chat-message user-message">
      ${sQuestion}
    </div>
  `;

  fetch(`https://api.openai.com/v1/completions`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + OPEN_API_KEY
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: sQuestion,
      max_tokens: 2048,
      temperature: 1.0,
    }),
  })
  .then((response) => response.json())
  .then((json) => {
    if (json.error ?.message) {
      chatOutput.innerHTML += `
        <div class="chat-message bot-message">
          Erro: ${json.error.message}
        </div>
      `;
    } else if (json.choices ?.[0].text) {
      const botResponse = json.choices[0].text.trim();
      chatOutput.innerHTML += `
        <div class="chat-message bot-message">
          ${botResponse}
        </div>
      `;
    }
    chatOutput.scrollTop = chatOutput.scrollHeight;
  })
  .catch((error) => {
    console.error("error", error);
    chatOutput.innerHTML += `
      <div class="chat-message bot-message">
        Houve um erro ao processar sua pergunta.
      </div>
    `;
  })
  .finally(() => {
    inputQuestion.value = "";
    inputQuestion.focus();
  });
}

function clearChat() {
  chatOutput.innerHTML = "";
}
$(document).ready(function(){
    $('.slick-slider').slick({
      autoplay: true,
      autoplaySpeed: 2000,
      arrows: false,
      dots: true,
      infinite: true,
      speed: 500,
      fade: true,
      cssEase: 'linear'
    });
  });
  