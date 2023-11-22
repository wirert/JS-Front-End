function encodeAndDecodeMessages() {
  let [encodeBtn, decodeBtn] = Array.from(document.querySelectorAll("button"));
  let [encodeArea, decodeArea] = Array.from(
    document.querySelectorAll("textarea")
  );
  encodeBtn.addEventListener("click", () => {
    decodeArea.value = codeText(encodeArea.value, 1);
    encodeArea.value = "";
  });

  decodeBtn.addEventListener("click", () => {
    decodeArea.value = codeText(decodeArea.value, -1);
  });

  function codeText(text, salt) {
    let textArr = text.split("").map((char) => {
      let intChar = char.charCodeAt() + salt;
      return String.fromCharCode(intChar);
    });
    return textArr.join("");
  }
}
