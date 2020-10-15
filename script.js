const fields = document.querySelectorAll("[required]");

function validateField(field) {
  //verificar existencia de erros
  function verifyErrors() {
    let foundError = false;

    for (let error in field.validity) {
      if (field.validity[error] && !field.validity.valid) {
        foundError = error;
      }
    }
    return foundError;
  }

  function customMessage(typeError) {
    const messages = {
      email: {
        valueMissing: "Por favor digite seu email",
        typeMismatch: "Por favor digite um email válido",
      },
      text: {
        valueMissing: "Por favor preencha o campo",
        typeMismatch: "Por favor preencha o campo corretamente",
      },
    };

    return messages[field.type][typeError];
  }

  function setCustomMessage(message) {
    const spanError = field.parentNode.querySelector("span.error");

    if (message) {
      spanError.classList.add("active");
      spanError.innerHTML = message;
    } else {
      spanError.classList.remove("active");
      spanError.innerHTML = "";
    }
  }

  return function () {
    const error = verifyErrors();

    if (error) {
      const message = customMessage(error);

      field.style.borderColor = "#ff5263";
      setCustomMessage(message);
    } else {
      setCustomMessage();
    }
  };
}

function customValidation(event) {
  const field = event.target;
  const validation = validateField(field);

  validation();
}

for (field of fields) {
  field.addEventListener("invalid", (event) => {
    //eliminar bubble
    event.preventDefault();

    customValidation(event);
  });
  field.addEventListener("blur", customValidation);
}

document.querySelector("form").addEventListener("submit", (event) => {
  alert("Success");

  event.preventDefault();
});
