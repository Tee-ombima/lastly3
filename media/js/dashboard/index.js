$(document).ready(function () {
  // check car-owner in local storage
  let carOwner = localStorage.getItem("car-owner");
  if (!carOwner) {
    // redirect
    $(location).attr("href", "/auth/login");
  }
  // send a request to the server for profile info
  $.ajax({
    type: "POST",
    url: "/getProfileInfo",
    data: {
      carOwner: carOwner,
      csrfmiddlewaretoken: window.CSRF_TOKEN,
    },
    success: function (data) {
      // turn off the loader
      $("#dashboard-profile-info-loader").hide();
      // turn on the data section
      $("#dashboard-profile-info-content").show();
      // inject the data
      $("#dashboard-profile-info-img").attr(
        "src",
        `/media/${data.profile_picture}`
      );
      $("#dashboard-profile-info-img").attr("alt", `${data.name}`);
      $("#dashboard-profile-info-name").html(data.name);
    },
    error: function (_, __, error) {
      console.log("error", error);
    },
  });

  // send a request to the server for oranges
  $.ajax({
    type: "POST",
    url: "/getProfileVehicles",
    data: {
      carOwner: carOwner,
      csrfmiddlewaretoken: window.CSRF_TOKEN,
    },
    success: function (data) {
      // turn off the loader
      $("#oranges-section-loader").hide();
      // turn on the data section
      $("#oranges-section-data").show();
      // if no data, show an error
      if (oranges.length === 0) {
        return $("#oranges-section-data").append(
          `
          <div class="col-12 col-sm-12 col-md-12">
          <p class="text-center">You have not added any orange</p>
          </div>
          `
        );
      }
      // inject the data
      return $("#oranges-section-data").append(
        $.map(data.oranges, function (orange) {
          return `
          <div class="col-12 col-sm-4 col-md-4">
            <div class="product-item">
            <a href="/oranges/${
              orange.pk
            }"><img src="/media/${orange.fields.foreground_image}" alt="${orange.fields.model}"></a>
            <div class="down-content">
                <a href="/oranges/${
                  orange.pk
                }"><h4>${orange.fields.type}, ${orange.fields.model}</h4></a>

                <h6> ${orange.fields.price} </h6>

                <small>
                <strong title="Author"><i class="fa fa-dashboard"></i>${
                  orange.fields.maturity_date
                }</strong> &nbsp;&nbsp;&nbsp;&nbsp;
                <strong title="Author"><i class="fa fa-cube"></i>${
                  orange.fields.supplier
                }</strong>&nbsp;&nbsp;&nbsp;&nbsp;
                <strong title="Location"><i class="material-icons">add_location</i>${
                  orange.fields.location
                }</strong>
                </small>
            </div>
            <div class="down-actions">

            

              <button class="icon-button" onclick=deleteVehicle(${orange.pk})>
                <i class="fa fa-trash"></i>
              </button>
            </div>
            </div>
        </div>
          `;
        })
      );
    },
    error: function (_, __, error) {
      console.log("error", error);
    },
  });
});

function toggleHiredStatus(vehicle_id) {
  // handle the request to server
  $.ajax({
    type: "POST",
    url: "/oranges/update-hired-status",
    data: {
      orange: vehicle_id,
      csrfmiddlewaretoken: window.CSRF_TOKEN,
    },
    success: function (_) {
      // refresh the page
      return $(location).attr("href", "/dashboard");
    },
    error: function (_, __, error) {
      throw error;
    },
  });
}

function deleteVehicle(vehicle_id) {
  // 1. raise a prompt to confirm
  let confirm = window.confirm("Are you sure to proceed");

  if (confirm) {
    // handle the request to server
    $.ajax({
      type: "POST",
      url: "/oranges/delete-orange",
      data: {
        orange: vehicle_id,
        csrfmiddlewaretoken: window.CSRF_TOKEN,
      },
      success: function (_) {
        // refresh the page
        return $(location).attr("href", "/dashboard");
      },
      error: function (_, __, error) {
        throw error;
      },
    });
  }
}
