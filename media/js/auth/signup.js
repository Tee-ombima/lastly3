function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

$(document).ready(function () {
  // submit event for the form
  $("#signup-form").on("submit", function (e) {
    e.preventDefault();

    // turn off the error component
    $("#signup-form-error-component").hide();

    let form_data = new FormData();
    // get the data
    let name = $("#name-input").val();
    let email = $("#email-input").val();
    let phone_number = $("#phone-input").val();
    let location = $("#location-input").val();
    let profile_picture = $("#avatar-input")[0].files[0];
    let password = $("#password-input").val();

    // validate the email
    if (!validateEmail(email)) {
      // turn on the error component
      $("#signup-form-error-component").show();
      // show the error
      return $("#signup-form-error-component").html("Invalid email");
    }

    form_data.append("name", name);
    form_data.append("email", email);
    form_data.append("phone_number", phone_number);
    form_data.append("location", location);
    form_data.append("profile_picture", profile_picture);
    form_data.append("password", password);
    form_data.append("csrfmiddlewaretoken", window.CSRF_TOKEN);

    // send request to server
    $.ajax({
      type: "POST",
      url: "/auth/handle-signup",
      data: form_data,
      enctype: "multipart/form-data",
      processData: false,
      contentType: false,
      success: function (data) {
        let result = data;

        if (result.error) {
          // turn on the error component
          $("#signup-form-error-component").show();
          // show the error
          return $("#signup-form-error-component").html(result.error);
        } else {
          // set the id to local storage
          localStorage.setItem("car-owner", result.carOwner);

          // redirect
          return $(location).attr("href", "/dashboard");
        }
      },
      error: function (_, _, error) {
        console.log("error", error);
      },
    });
  });
});
