$(document).ready(function () {
  // setting a hash on initial page load
  window.location.hash = "oranges";
  $("#oranges").show();
  $("#oranges-link").addClass("active");

  // listen to the hash change
  $(window).on("hashchange", function () {
    let new_hash = window.location.hash;

    if (new_hash === "#oranges") {
      // display oranges
      $("#oranges").show();
      // remove add orange from active
      $("#add-orange-link").removeClass("active");
      // set oranges to active
      $("#oranges-link").addClass("active");
      // shut down add orange
      $("#add-orange").hide();
    } else if (new_hash === "#add-orange") {
      // display add orange
      $("#add-orange").show();
      // set add orange to active
      $("#add-orange-link").addClass("active");
      // remove oranges from active
      $("#oranges-link").removeClass("active");
      // shut down oranges
      $("#oranges").hide();
    }
  });
});
