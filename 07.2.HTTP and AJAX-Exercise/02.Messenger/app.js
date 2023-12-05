function attachEvents() {
  document.querySelector("#submit").addEventListener("click", sendMessage);
  document.querySelector("#refresh").addEventListener("click", getAllMessages);
}

async function sendMessage() {
  const authorInput = document.querySelector('input[name="author"]');
  const contentInput = document.querySelector('input[name="content"]');

  await fetch("http://localhost:3030/jsonstore/messenger", {
    method: "POST",
    body: JSON.stringify({
      author: authorInput.value,
      content: contentInput.value,
    }),
  });

  authorInput.value = "";
  contentInput.value = "";
}

async function getAllMessages() {
  const messages = await (
    await fetch("http://localhost:3030/jsonstore/messenger")
  ).json();
  const textarea = document.querySelector("#messages");
  let messagesArr = [];
  Object.values(messages).forEach((message) => {
    messagesArr.push(`${message.author}: ${message.content}`);
  });

  textarea.value = messagesArr.join("\n");
}

attachEvents();
