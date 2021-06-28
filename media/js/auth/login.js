function verifyEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

$(document).ready(function () {
  // Target the submit action on the form
  $("#login-form").on("submit", function (e) {
    e.preventDefault();
    // error component not showing
    $("#login-form-error-component").hide();
    // get the data
    let email = $("#email-input").val();
    let password = $("#password-input").val();

    // check first if the email is valid
    let isValid = verifyEmail(email);
    if (!isValid) {
      // turn on the error section
      $("#login-form-error-component").show();
      // show the error
      $("#login-form-error-component").html("Invalid email");
    } else {
      // send the data to server
      $.ajax({
        type: "POST",
        url: "/auth/handle-login",
        data: {
          csrfmiddlewaretoken: window.CSRF_TOKEN,
          email,
          password,
        },
        dataType: "json",
        success: function (data) {
          let result = data;
          if (result.error) {
            // turn on the error section
            $("#login-form-error-component").show();
            // show the error
            $("#login-form-error-component").html(result.error);
          } else {
            // set the id to local storage
            localStorage.setItem("car-owner", result.carOwner);
            // redirect to dashboard page
            return $(location).attr("href", "/dashboard");
          }
        },
        error: function (_, _, error) {
          console.log("error", error);
        },
      });
    }
  });
});
