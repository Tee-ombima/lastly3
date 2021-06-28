$(document).ready(function () {
  let data = oranges.replace(/^"(.*)"$/, "$1");
  data = JSON.parse(`${data}`);

  function displayVehicles(oranges) {
    // display the oranges
    return $("#orange-data-content").append(
      $.map(oranges, function (orange) {
        return `
          <div class="col-md-6">
            <div class="product-item">
            <a href='/oranges/${orange.pk}'><img src="/media/${orange.fields.foreground_image}" alt="${orange.fields.model}"></a>
            <div class="down-content">
                <a href="/oranges/${orange.pk}"><h4>${orange.fields.type}, ${orange.fields.model}</h4></a>

                <h6> ${orange.fields.price} </h6>

                <small>
                <strong title="Author"><i class="fa fa-dashboard"></i>${orange.fields.maturity_date}</strong> &nbsp;&nbsp;&nbsp;&nbsp;
                <strong title="Author"><i class="fa fa-cube"></i>${orange.fields.supplier}</strong>&nbsp;&nbsp;&nbsp;&nbsp;
                <strong title="Location"><i class="material-icons">add_location</i>${orange.fields.location}</strong>
                </small>

                <br/>
                
            </div>
            <div class="down-actions">
                <a href="/oranges/${orange.pk}" class='filled-button'>Hire now</a>
            </div>
            </div>
        </div>
          `;
      })
    );
  }

  function emptyVehicles() {
    return $("#orange-data-content").empty();
  }

  function populateSelects(oranges) {
    let vehicles_input_data = oranges.map((orange) => orange.fields);

    function getPropertyData(prop) {
      let result = vehicles_input_data.map((orange) => orange[prop]);
      return [...new Set(result)];
    }

    // populate the select type input
    let makes = getPropertyData("type");

    $("#type-select-input").append(
      $.map(makes, function (type) {
        return `
          <option value='${type}'>${type}</option>
          `;
      })
    );

    // populate the select model input
    let models = getPropertyData("model");

    $("#model-select-input").append(
      $.map(models, function (model) {
        return `
          <option value='${model}'>${model}</option>
          `;
      })
    );

    // populate the price input
    let prices = getPropertyData("price");

    $("#price-select-input").append(
      $.map(prices, function (price) {
        return `
          <option value='${price}'>${price}</option>
          `;
      })
    );

    // populate the maturity_date input
    let mileages = getPropertyData("maturity_date");

    $("#maturity_date-select-input").append(
      $.map(mileages, function (maturity_date) {
        return `
          <option value='${maturity_date}'>${maturity_date}</option>
          `;
      })
    );

    // populate the engine size input
    let engine_sizes = getPropertyData("supplier");

    $("#engine-size-input").append(
      $.map(engine_sizes, function (supplier) {
        return `
          <option value='${supplier}'>${supplier}</option>
          `;
      })
    );

    // populate the grafted input
    let fuels = getPropertyData("grafted");

    $("#grafted-input").append(
      $.map(fuels, function (grafted) {
        return `
          <option value='${grafted}'>${grafted}</option>
          `;
      })
    );

    // populate the gear box input
    let transmissions = getPropertyData("supplier_location");

    $("#gear-box-input").append(
      $.map(transmissions, function (supplier_location) {
        return `
          <option value='${supplier_location}'>${supplier_location}</option>
          `;
      })
    );

    // number of seats input
    let no_of_seats = getPropertyData("reported_cases");

    $("#number-of-seats-input").append(
      $.map(no_of_seats, function (seats) {
        return `
          <option value='${seats}'>${seats}</option>
          `;
      })
    );
  }

  // simple loader
  function loader() {
    return $("#orange-data-content").append(
      `<div class="col-12 col-sm-12 col-md-12 text-center">
          <h5>Loading!!</h5>
          </div>`
    );
  }

  // attaching event listeners
  // General func for event listeners
  function handleEvent(value, field) {
    if (value) {
      // change the data
      let new_vehicles = data.filter(
        (orange) => orange.fields[field] === value
      );

      //empty current.
      emptyVehicles();
      // display new
      displayVehicles(new_vehicles);
    } else {
      // empty current
      emptyVehicles();
      // display new
      displayVehicles(data);
    }
  }
  // type  event listener
  $("#type-select-input").on("change", function (e) {
    handleEvent(e.target.value, "type");
  });

  // model  event listener
  $("#model-select-input").on("change", function (e) {
    handleEvent(e.target.value, "model");
  });

  //price event listener
  $("#price-select-input").on("change", function (e) {
    handleEvent(e.target.value, "price");
  });

  //maturity_date event listener
  $("#maturity_date-select-input").on("change", function (e) {
    handleEvent(e.target.value, "maturity_date");
  });

  //engine-size event listener
  $("#engine-size-input").on("change", function (e) {
    handleEvent(e.target.value, "supplier");
  });

  //grafted event listener
  $("#grafted-input").on("change", function (e) {
    handleEvent(e.target.value, "grafted");
  });

  //gear box listener
  $("#gear-box-input").on("change", function (e) {
    handleEvent(e.target.value, "supplier_location");
  });

  //number of seats listener
  $("#number-of-seats-input").on("change", function (e) {
    handleEvent(parseInt(e.target.value), "reported_cases");
  });

  displayVehicles(data);
  populateSelects(data);
});
