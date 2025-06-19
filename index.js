
const form = document.getElementById("registrationForm");
    const tableBody = document.querySelector("#userTable tbody");

    // Load stored users on page load
    window.addEventListener("DOMContentLoaded", () => {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      users.forEach(addUserToTable);
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const dob = document.getElementById("dob").value;
      const acceptTerms = document.getElementById("acceptTerms").checked;

      if (!validateEmail(email)) {
        alert("Please enter a valid email.");
        return;
      }

      if (!validateAge(dob)) {
        alert("Age must be between 18 and 55.");
        return;
      }

      const user = { name, email, password, dob, acceptTerms: acceptTerms ? "Yes" : "No" };

      // Add to localStorage
      const users = JSON.parse(localStorage.getItem("users")) || [];
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));

      addUserToTable(user);

      form.reset();
    });

    function addUserToTable(user) {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.password}</td>
        <td>${user.dob}</td>
        <td>${user.acceptTerms}</td>
      `;
      tableBody.appendChild(tr);
    }

    function validateEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }

    function validateAge(dob) {
      const birthDate = new Date(dob);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const dayDiff = today.getDate() - birthDate.getDate();
      const adjustedAge = (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) ? age - 1 : age;
      return adjustedAge >= 18 && adjustedAge <= 55;
    }