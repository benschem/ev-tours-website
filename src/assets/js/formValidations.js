/* -------------------------------------------------------------------------- */
/*                    Client Side Contact Form Validations                    */
/* -------------------------------------------------------------------------- */

/* ------------------------ Listen to all form fields ----------------------- */

document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll("#firstName, #lastName, #email, #mobile, #venueLocation, #message");

  inputs.forEach((input) => {
    input.addEventListener("blur", () => {
      validateInput(input);
    });
    input.addEventListener("keyup", () => {
      hideAllValidations(input);
    });
  });
});

/* ----------------------- Validate a form input field ---------------------- */

const validateInput = (input) => {
  if (input.value === "") {
    hideAllValidations(input);
  } else {
    setValidityMessage(input);
    showValidOrInvalid(input);
  }
};

/* ---------------- Don't show any error or success messages ---------------- */

const hideAllValidations = (input) => {
  input.setCustomValidity("");
  const tickOrCross = input.previousElementSibling;
  const errorSpan = input.nextElementSibling;
  tickOrCross.classList.remove("tick", "cross");
  errorSpan.classList.remove("formError");
  errorSpan.textContent = "";
};

/* ------------------ Show either valid or invalid styling ------------------ */

const showValidOrInvalid = (input) => {
  const isValid = input.checkValidity();

  if (isValid) {
    applyValidStyling(input);
  } else {
    applyInvalidStyling(input);
  }
};

/* ------------------------------ Valid styling ----------------------------- */

const applyValidStyling = (input) => {
  const errorSpan = input.nextElementSibling;
  const tickOrCross = input.previousElementSibling;
  tickOrCross.classList.remove("cross");
  tickOrCross.classList.add("tick");
  errorSpan.classList.remove("formError");
  errorSpan.textContent = "";
};

/* ----------------------------- Invalid styling ---------------------------- */

const applyInvalidStyling = (input) => {
  const errorSpan = input.nextElementSibling;
  const tickOrCross = input.previousElementSibling;
  tickOrCross.classList.remove("tick");
  tickOrCross.classList.add("cross");
  errorSpan.classList.add("formError");
  errorSpan.textContent = input.validationMessage;
};

/* -------------------------- Set validity message -------------------------- */

const setValidityMessage = (input) => {
  switch (input.id) {
    case "firstName":
    case "lastName":
      setCustomMessage(input, "name");
      break;
    case "email":
      setCustomMessage(input, "email");
      break;
    case "mobile":
      setCustomMessage(input, "mobile");
      break;
    case "venueLocation":
      setCustomMessage(input, "venue");
      break;
    case "message":
      setCustomMessage(input, "message");
      break;
    default:
      break;
  }
};

/* ------------------- Choose which error message to show ------------------- */

const setCustomMessage = (input, type) => {
  const userInput = input.validity;

  switch (type) {
    case "name":
      if (userInput.valueMissing) {
        input.setCustomValidity("⚠️ You haven't entered a name");
      } else if (userInput.patternMismatch) {
        input.setCustomValidity("⚠️ That doesn't look like a name");
      } else if (userInput.tooShort) {
        input.setCustomValidity("⚠️ The name looks too short");
      } else {
        input.setCustomValidity("");
      }
      break;
    case "email":
      if (userInput.valueMissing) {
        input.setCustomValidity("⚠️ You haven't entered an email");
      } else if (userInput.tooShort) {
        input.setCustomValidity("⚠️ Your email looks too short");
      } else if (userInput.typeMismatch) {
        input.setCustomValidity("⚠️ That doesn't look like an email");
      } else {
        input.setCustomValidity("");
      }
      break;
    case "mobile":
      if (userInput.valueMissing) {
        input.setCustomValidity("⚠️ You haven't entered a mobile");
      } else if (userInput.patternMismatch) {
        input.setCustomValidity("⚠️ That doesn't look like a mobile");
      } else if (userInput.tooShort) {
        input.setCustomValidity("⚠️ Your mobile looks too short");
      } else {
        input.setCustomValidity("");
      }
      break;
    case "venue":
      if (userInput.tooShort) {
        input.setCustomValidity("⚠️ That looks too short to be a location");
      } else {
        input.setCustomValidity("");
      }
      break;
    case "message":
      if (userInput.tooShort) {
        input.setCustomValidity("⚠️ Your message is too short");
      } else if (userInput.tooLong) {
        input.setCustomValidity("⚠️ Your message is too long");
      } else {
        input.setCustomValidity("");
      }
      break;
    default:
      break;
  }
};

/* -------------------------------------------------------------------------- */
