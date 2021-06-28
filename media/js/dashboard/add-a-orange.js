$(document).ready(function () {
  $("#add-orange-form").on("submit", function (e) {
    e.preventDefault();

    // ensure that the success message is turned off
    $("#add-orange-form-msg-component").hide();

    let type = $("#type-input").val();
    let price = $("#price-input").val();
    let maturity_date = $("#maturity_date-input").val();
    let model = $("#model-input").val();
    let location = $("#location-input").val();
    let supplier = $("#engine-size-input").val();
    let gear_box = $("#gear-box-input").val();
    let grafted = $("#grafted-input").val();
    let no_of_seats = $("#number-of-seats-input").val();
    let front_image = $("#front-image-input")[0].files[0];
    let inside_image = $("#inside-image-input")[0].files[0];
    let back_image = $("#back-image-input")[0].files[0];
    let owner = localStorage.getItem("car-owner");

    let form_data = new FormData();
    form_data.append("csrfmiddlewaretoken", window.CSRF_TOKEN);
    form_data.append("type", type);
    form_data.append("price", price);
    form_data.append("maturity_date", maturity_date);
    form_data.append("model", model);
    form_data.append("location", location);
    form_data.append("supplier", supplier);
    form_data.append("gear_box", gear_box);
    form_data.append("grafted", grafted);
    form_data.append("reported_cases", no_of_seats);
    form_data.append("front_image", front_image);
    form_data.append("inside_image", inside_image);
    form_data.append("back_image", back_image);
    form_data.append("owner", owner);

    // send the data to the server
    $.ajax({
      type: "POST",
      url: "/oranges/add-orange",
      data: form_data,
      contentType: false,
      processData: false,
      success: function (data) {
        if (data.message) {
          // show the success message
          $("#add-orange-form-msg-component").show();
          // inject the message
          $("#add-orange-form-msg-component").html(data.message);
          // reset the value
          return $("#add-orange-form").trigger("reset");
        }
      },
      error: function (_, __, error) {
        console.log("error", error);
      },
    });
  });
});
