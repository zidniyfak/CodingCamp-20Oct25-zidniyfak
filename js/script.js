console.log("Hello World");

function welcomeSpeech() {
  let name = prompt("What is your name?");
  alert("Welcome " + name);

  document.getElementById("greet-name").innerHTML = name;
}

function validateForm() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  if (name === "" || email === "" || message === "") {
    alert("Please fill in all fields.");
  } else {
    alert("Form submitted successfully!");
  }

  console.log(name, email, message);
}
