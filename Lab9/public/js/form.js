(function () {
  const staticForm = document.getElementById("checkForPalindrome");

  if (staticForm) {
    const operationPalindrome = document.getElementById("ValuePalindrome");

    staticForm.addEventListener("submit", (event) => {
      event.preventDefault();

      try {
        let palindromeValue = operationPalindrome.value;
        if (palindromeValue.trim() == null || palindromeValue.trim() == "") {
          document.getElementById("error").innerHTML =
            "You did not enter any string to check for palindrome.";
        } else {
          document.getElementById("error").innerHTML = "Checked for palindrome";
        }

        const ol = document.getElementById("attempts");
        const list = document.createElement("li");
        list.appendChild(document.createTextNode(palindromeValue));
        newPalindromeValue = palindromeValue.replace(/[^a-zA-Z1-9]/g, "");
        newPalindromeValue = newPalindromeValue.split(" ").join("");
        if (
          newPalindromeValue.toLowerCase() ==
          newPalindromeValue.toLowerCase().split("").reverse().join("")
        ) {
          list.classList.add("is-palindrome");
        } else {
          list.classList.add("not-palindrome");
        }
        ol.appendChild(list);
      } catch (e) {
        console.log(e.message);
      }
    });
  }
})();
