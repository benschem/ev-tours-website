/* -------------------------------------------------------------------------- */
/*                    Client Side Contact Form Validations                    */
/* -------------------------------------------------------------------------- */

/* ------------------------ Listen to all form fields ----------------------- */

document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll(
    "#firstName, #lastName, #email, #mobile, #serviceType, #date, #pickup, #dropoff, #passengers, #departureTime, #itinerary, #referralSource"
  );

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
    case "date":
      setCustomMessage(input, "date");
      break;
    case "pickup":
      setCustomMessage(input, "pickup");
      break;
    case "dropoff":
      setCustomMessage(input, "dropoff");
      break;
    case "itinerary":
      setCustomMessage(input, "itinerary");
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
      if (userInput.patternMismatch) {
        input.setCustomValidity("That doesn't look like a name");
      } else if (userInput.tooShort) {
        input.setCustomValidity("The name looks too short");
      } else {
        input.setCustomValidity("");
      }
      break;
    case "email":
      if (userInput.tooShort) {
        input.setCustomValidity("Your email looks too short");
      } else if (userInput.typeMismatch) {
        input.setCustomValidity("That doesn't look like an email");
      } else {
        input.setCustomValidity("");
      }
      break;
    case "mobile":
      if (userInput.patternMismatch) {
        input.setCustomValidity("That doesn't look like a mobile");
      } else if (userInput.tooShort) {
        input.setCustomValidity("Your mobile looks too short");
      } else {
        input.setCustomValidity("");
      }
      break;
    case "date":
      if (userInput.rangeUnderflow) {
        input.setCustomValidity("Date can't be in the past");
      } else {
        input.setCustomValidity("");
      }
      break;
    case "pickup":
      if (userInput.tooShort) {
        input.setCustomValidity("That doesn't look like a location");
      } else {
        input.setCustomValidity("");
      }
      break;
    case "dropoff":
      if (userInput.tooShort) {
        input.setCustomValidity("That doesn't look like a location");
      } else {
        input.setCustomValidity("");
      }
      break;
    case "itinerary":
      if (userInput.tooShort) {
        input.setCustomValidity("Your message is too short");
      } else if (userInput.tooLong) {
        input.setCustomValidity("Your message is too long");
      } else {
        input.setCustomValidity("");
      }
      break;
    default:
      break;
  }
};

/* ----------------- Prevent form submit with invalid values ----------------- */

const formSubmitBtn = document.querySelector("#formSubmitBtn");

formSubmitBtn.addEventListener("click", (event) => {
  checkBeforeSubmit(event);
});
formSubmitBtn.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkBeforeSubmit(event);
  }
});

function checkBeforeSubmit(event) {
  event.preventDefault();
  event.stopPropagation();

  let allValid = true;

  const inputs = document.querySelectorAll(
    "#firstName, #lastName, #email, #mobile, #serviceType, #date, #pickup, #dropoff, #passengers, #departureTime, #itinerary, #referralSource"
  );

  inputs.forEach((input) => {
    const isValid = input.checkValidity();

    if (!isValid) {
      applyInvalidStyling(input);
      allValid = false;
    }
  });

  if (allValid) {
    form.submit();
  }
}

/* -------------------------------------------------------------------------- */
