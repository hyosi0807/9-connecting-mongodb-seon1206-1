// functions.js

let userName = prompt("Enter your name");

// Simulate an HTTP redirect:
window.location.replace("http://localhost:3000/name/" + userName);
