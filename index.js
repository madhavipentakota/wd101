
  const form = document.getElementById("registrationForm");
  const tableBody = document.querySelector("#entriesTable tbody");

  function getEntries() {
    const entries = localStorage.getItem("formEntries");
    return entries ? JSON.parse(entries) : [];
  }

  function displayEntries() {
    const entries = getEntries();
    tableBody.innerHTML = "";

    entries.forEach(entry => {
      const newRow = tableBody.insertRow();
      newRow.innerHTML = `
        <td>${entry.name}</td>
        <td>${entry.email}</td>
        <td>${entry.password}</td>
        <td>${entry.dob}</td>
        <td>${entry.acceptTerms ? "Yes" : "No"}</td>
      `;
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const passwordField = document.getElementById("password");
    const dobField = document.getElementById("dob");
    const acceptTermsField = document.getElementById("acceptTerms");

    // Clear previous error styles
    [nameField, emailField, passwordField, dobField].forEach(field => {
      field.classList.remove("invalid");
    });

    let isValid = true;

    // Validate name (letters and spaces only)
    if (!/^[A-Za-z\s]+$/.test(nameField.value.trim())) {
      nameField.classList.add("invalid");
      isValid = false;
    }

    // Validate email (basic pattern)
    if (!/\S+@\S+\.\S+/.test(emailField.value.trim())) {
      emailField.classList.add("invalid");
      isValid = false;
    }

    // // Password at least 6 characters
    // if (passwordField.value.length < 6) {
    //   passwordField.classList.add("invalid");
    //   isValid = false;
    // }

    // DOB must not be empty
    if (!dobField.value) {
      dobField.classList.add("invalid");
      isValid = false;
    }

   


    if (!isValid) return; // Stop if any invalid input

    const entry = {
      name: nameField.value.trim(),
      email: emailField.value.trim(),
      password: passwordField.value,
      dob: dobField.value,
      acceptTerms: acceptTermsField.checked
    };

    const entries = getEntries();
    entries.push(entry);
    localStorage.setItem("formEntries", JSON.stringify(entries));

    displayEntries();
    form.reset();
  });

  window.addEventListener("DOMContentLoaded", displayEntries);


 
