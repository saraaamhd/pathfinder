document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("skillForm");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login again.");
      window.location.href = "login.html";
      return;
    }

    const formData = new FormData(form);
    const skills = {};

    formData.forEach((value, key) => {
      skills[key] = Number(value);
    });

    try {
      const response = await fetch("http://localhost:5000/api/profile/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
        body: JSON.stringify({ skills })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Error saving profile");
        return;
      }

      alert("Skill profile saved successfully!");

      // Redirect to recommendation page
      window.location.href = "recommendation.html";

    } catch (error) {
      console.error("Profile Save Error:", error);
      alert("Server error");
    }

  });

});