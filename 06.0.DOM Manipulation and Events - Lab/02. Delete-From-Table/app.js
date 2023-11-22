function deleteByEmail() {
  let inputEmail = document.querySelector('input[name="email"]').value;

  let tableEmails = Array.from(
    document.querySelectorAll("#customers td:nth-child(even)")
  );

  let emailToDelete = tableEmails.find((e) => e.textContent === inputEmail);
  let result;
  if (emailToDelete) {
    emailToDelete.parentElement.remove();
    result = "Deleted.";
  } else {
    result = "Not found.";
  }

  document.querySelector("#result").textContent = result;
}
