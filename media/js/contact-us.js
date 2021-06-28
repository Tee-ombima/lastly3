//verify email
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
$(document).ready(function () {
  // Listen to when the form is submitted
  $("#contact-us-form").on("submit", function (e) {
    // avoid auto-loading
    e.preventDefault();

    // reset any error
    $("#email-input-error").html(" ");

    // get the values.
    let name = $("#name-input").val();
    let email = $("#email-input").val();
    let subject = $("#subject-input").val();
    let message = $("#message-input").val();

    // check if we have a valid email
    if (!validateEmail(email)) {
      return $("#email-input-error").html("Invalid email");
    }

    // start the loading
    $("#contact-us-form-submit").html("Sending...");
    // else we send the data to the server
    $.ajax({
      type: "POST",
      url: "/handle-contact-us",
      data: {
        name,
        email,
        subject,
        message,
        csrfmiddlewaretoken: window.CSRF_TOKEN,
      },
      success: function (data) {
        // stop the loader
        $("#contact-us-form-submit").html("Send Message");
        if (data.message) {
          // reset the form
          $("#contact-us-form").trigger("reset");
          // show an alert message
          $("#contact-us-form-alert").show();
          $("#contact-us-form-alert").html(data.message);
        }
      },
      error: function (_, __, error) {
        // stop the loader
        $("#contact-us-form-submit").html("Send Message");
        console.log("error", error);
      },
    });
  });
});
