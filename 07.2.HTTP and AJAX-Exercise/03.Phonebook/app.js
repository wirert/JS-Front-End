function attachEvents() {
  document
    .querySelector("#btnLoad")
    .addEventListener("click", visualizePhonebook);
  document
    .querySelector("#btnCreate")
    .addEventListener("click", addToPhoneBook);
}
const PHONEBOOK_URL = "http://localhost:3030/jsonstore/phonebook";
const services = {
  async getPhonebook() {
    return (await fetch(PHONEBOOK_URL)).json();
  },
  async postEntry(person, phone) {
    return await fetch(PHONEBOOK_URL, {
      method: "POST",
      body: JSON.stringify({ person, phone }),
    });
  },
  async deleteEntry(id) {
    return await fetch(`${PHONEBOOK_URL}/${id}`, {
      method: "DELETE",
    });
  },
};

async function visualizePhonebook() {
  const bookEntries = await services.getPhonebook();
  const phoneBookUl = document.querySelector("#phonebook");
  phoneBookUl.textContent = "";

  Object.values(bookEntries).forEach((entry) => {
    const entryLi = createPhoneBookEntryElement(entry);
    phoneBookUl.appendChild(entryLi);
  });
}

function addToPhoneBook() {
  const personInput = document.querySelector("#person");
  const phoneInput = document.querySelector("#phone");

  services.postEntry(personInput.value, phoneInput.value);

  personInput.value = "";
  phoneInput.value = "";

  visualizePhonebook();
}

function createPhoneBookEntryElement(entry) {
  const entryLi = document.createElement("li");
  entryLi.textContent = `${entry.person}: ${entry.phone}`;
  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.setAttribute("data-id", entry._id);

  delBtn.addEventListener("click", async (e) => {
    const id = e.currentTarget.getAttribute("data-id");
    services.deleteEntry(id);
    visualizePhonebook();
  });

  entryLi.appendChild(delBtn);

  return entryLi;
}

attachEvents();
