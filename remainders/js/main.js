document.addEventListener("DOMContentLoaded", () => {
  const textInput = document.getElementById("textInput");
  const charCount = document.getElementById("charCount");
  const submitBtn = document.getElementById("submitBtn");
  const formView = document.getElementById("formView");
  const notNum = document.getElementById("notNum");
  const bell = document.getElementById("bell");
  const remBtn = document.getElementById("remBtn");
  const counterView = document.getElementById("counterView");
  const remindersView = document.getElementById("remindersView");
  const arrow1 = document.getElementById("arrow1");
  const trash = document.getElementById("trash");
  const secRem = document.getElementById("secRem");
  const username = document.querySelector('input[type="text"]');
  const password = document.querySelector('input[type="password"]');
  const email = document.querySelector('input[type="email"]');
  const myBtn = document.querySelector('input[type="submit"]');
  const myForm = document.querySelector("form");

  // Forma

  const db = {
    // username: "Najco",
    // password: "nail1234",
    // email: "nailfehratovic@gmail.com",
    username: "1",
    password: "1",
    email: "1",
  };

  function createErrorDiv(input) {
    const errorDiv = document.createElement("div");
    errorDiv.classList.add("error-message");
    errorDiv.style.color = "#dc3545";
    errorDiv.style.fontSize = "14px";
    errorDiv.style.marginTop = "-15px";
    errorDiv.style.marginBottom = "10px";
    input.insertAdjacentElement("afterend", errorDiv);
    return errorDiv;
  }

  let usernameError = createErrorDiv(username);
  let passwordError = createErrorDiv(password);
  let emailError = createErrorDiv(email);

  myBtn.addEventListener("click", function (e) {
    e.preventDefault();
    let userData = {
      uv: username.value.trim(),
      pv: password.value.trim(),
      ev: email.value.trim(),
    };
    let isValid = true;

    usernameError.innerHTML = "";
    passwordError.innerHTML = "";
    emailError.innerHTML = "";

    if (userData.uv.length === 0) {
      username.style.border = "1px solid #dc3545";
      username.textContent = "Polje je prazno";
      isValid = false;
    } else if (db.username !== userData.uv) {
      username.style.border = "1px solid #dc3545";
      username.textContent = "Vase ime nije tacno";
      isValid = false;
    } else if (db.username === userData.uv) {
      username.style.border = " 1px solid #28a745";
    }

    if (userData.pv.length === 0) {
      password.style.border = "1px solid #dc3545";
      password.textContent = "Polje je prazno";
      isValid = false;
    } else if (db.password !== userData.pv) {
      password.style.border = "1px solid #dc3545";
      password.textContent = "Vase sifra nije tacna";
      isValid = false;
    } else if (db.password === userData.pv) {
      password.style.border = " 1px solid #28a745";
    }

    if (userData.ev.length === 0) {
      email.style.border = "1px solid #dc3545";
      email.textContent = "Polje je prazno";
      isValid = false;
    } else if (db.email !== userData.ev) {
      email.style.border = "1px solid #dc3545";
      email.textContent = "Vase email nije tacan";
      isValid = false;
    } else if (db.email === userData.ev) {
      email.style.border = " 1px solid #28a745";
    }

    if (isValid) {
      setTimeout(() => {
        counterView.style.display = "block";
        formView.classList.remove("d-flex");
        formView.style.display = "none";
        textInput.focus();
      }, 500);
    }
  });

  // BROJAC
  const maxChar = 150;
  let numMess = 0;
  let numRem = 1;

  let text = [];

  bell.addEventListener("click", () => {
    notNum.classList.remove("show");
    numMess = 0;
    notNum.textContent = "";

    counterView.style.display = "none";
    remindersView.style.display = "block";
  });

  textInput.addEventListener("input", () => {
    const currentLength = textInput.value.length;
    charCount.textContent = `${currentLength}/${maxChar} karaktera`;

    if (currentLength > maxChar) {
      charCount.classList.remove("warning");
      charCount.classList.add("danger-text");
      showNotification("Uneli ste previse karaktera", "error");
    } else if (currentLength > maxChar * 0.8) {
      charCount.classList.remove("danger-text");
      charCount.classList.add("warning");
    } else {
      charCount.classList.remove("warning");
      charCount.classList.remove("danger-text");
    }
  });

  submitBtn.addEventListener("click", () => {
    const currentLength = textInput.value.length;
    if (currentLength === 0) {
      showNotification("Polje ne sme da ostane prazno", "error");
    } else if (currentLength > maxChar) {
      showNotification("Smanji broj karaktera", "error");
    } else {
      const textValue = textInput.value;
      createTable(textValue);

      numMess++;
      showNotification("Poruka je poslana", "success");
      textInput.value = "";
      charCount.textContent = `0/${maxChar} karaktera`;
      charCount.classList.remove("warning");
      charCount.classList.remove("danger-text");
      bellNotificationCouter();
      textInput.focus();
    }
  });

  remBtn.addEventListener("click", () => {
    counterView.style.display = "none";
    remindersView.style.display = "block";
    notNum.classList.remove("show");
    numMess = 0;
    notNum.textContent = "";
  });

  function bellNotificationCouter() {
    notNum.classList.add("show");
    notNum.textContent = numMess;
  }

  //   Reminders

  function createTable(textContent) {
    let header = `Reminder ${numRem}`;
    const html = `
    <article class="card shadow-sm p-3 mb-3">
    <h3>${header}</h3>
    <p>${textContent}</p>
    </article>
    `;
    numRem++;
    secRem.innerHTML += html;

    localStorage.setItem("NumberRem", numRem);
    localStorage.setItem("Reminders", secRem.innerHTML);
  }

  arrow1.addEventListener("click", () => {
    remindersView.style.display = "none";
    counterView.style.display = "block";
    textInput.focus();
  });

  trash.addEventListener("click", () => {
    secRem.innerHTML = "";
    localStorage.removeItem("Reminders");
    localStorage.removeItem("NumberRem");
    numRem = 1;
    showNotification("Uspesno su izbrisani svi Reminderi", "warning");
  });

  const savedReminders = localStorage.getItem("Reminders");
  const savedNumRem = localStorage.getItem("NumberRem");

  if (savedReminders) {
    secRem.innerHTML = savedReminders;
  }
  if (savedNumRem) {
    numRem = savedNumRem;
  }
});

function showNotification(message, type = "info") {
  const container = document.getElementById("notification-container");
  const notification = document.createElement("div");
  notification.classList.add("notification", type);
  notification.textContent = message;
  container.appendChild(notification);

  setTimeout(() => {
    notification.classList.add("show");
  }, 100);
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      notification.remove();
    }, 500);
  }, 3000);
}
