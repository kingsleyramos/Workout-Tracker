$(document).ready(function() {
    // Getting references to our form and inputs
    let registerForm = $("#register");
    let userInput = $("input#username");
    let passwordInput = $("input#password");
  
    // When the form is submitted, we validate there's an username and password entered
    registerForm.on("submit", function(event) {
      event.preventDefault();
      let userData = {
        username: userInput.val().trim(),
        password: passwordInput.val().trim()
      };
      console.log(userData);
      if (!userData.username || !userData.password) {
        return;
      }
  
      // If we have an username and password we run the loginUser function and clear the form
      loginUser(userData.username, userData.password);
      userInput.val("");
      passwordInput.val("");
    });
  
    // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
    function loginUser(username, password) {
      $.post("/api/users/register", {
        'username': username,
        'password': password
      })
        .then(function() {
          window.location.replace("/");
          // If there's an error, log the error
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  });