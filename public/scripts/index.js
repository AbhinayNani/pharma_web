function toog() {
  document.addEventListener("DOMContentLoaded", (event) => {
    var exampleModal = document.getElementById("exampleModal");

    exampleModal.addEventListener("show.bs.modal", function (event) {
      var button = event.relatedTarget; // Button that triggered the modal
      var recipient = button.getAttribute("data-whatever"); // Extract info from data-* attributes

      var modalTitle = exampleModal.querySelector(".modal-title");
      var modalBodyInput = exampleModal.querySelector(".modal-body input");

      modalTitle.textContent = "New message to " + recipient;
      modalBodyInput.value = recipient;
    });
  });
}
function submitForm(event) {
  // Prevent default form submission
  // event.preventDefault();

  // Get form field values
  const emailValue = document.getElementById("email").value;
  const nameValue = document.getElementById("name").value;
  const subjectValue = document.getElementById("subject").value;
  const queryValue = document.getElementById("query").value;

  submitData({
    email: emailValue,
    name: nameValue,
    problem: subjectValue,
    query: queryValue,
  });

  // Log form field values
  console.log("Email:", emailValue);
  console.log("Name:", nameValue);
  console.log("Subject:", subjectValue);
  console.log("Query:", queryValue);

  // You can now use these values as needed, such as sending them to a server via AJAX
}

async function submitData(data) {
  fetch("http://localhost:9000/", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  })
    .then((responce) => {
      if (!responce.ok) {
        throw new Error();
      }
      return responce.json();
    })
    .then((data) => {
      console.log(data);
    });
}
