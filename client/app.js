function getBathValue() {
    var uiBathrooms = document.getElementsByName("uibath");
    // Using for loop instead of for...in to iterate over NodeList elements
    for (var i = 0; i < uiBathrooms.length; i++) {
        if (uiBathrooms[i].checked) {
            return parseInt(uiBathrooms[i].value);
        }
    }
    return -1; // Invalid Values
}

function getRoomValue() {
    var uiRoom = document.getElementsByName("uiROOM");
    // Using for loop instead of for...in to iterate over NodeList elements
    for (var i = 0; i < uiRoom.length; i++) {
        if (uiRoom[i].checked) {
            return parseInt(uiRoom[i].value);
        }
    }
    return -1; // Invalid Values
}

function onClickedEstimatePrice() {
    console.log("Estimate price button clicked");
    var sqft = document.getElementById("uiSqft");
    var room = getRoomValue();
    var bathrooms = getBathValue();
    var state = document.getElementById("uiLocations");
    var acre_lot = document.getElementById("uiAcre_lot");
    var estPrice = document.getElementById("uiEstimatedPrice");

    // Ensuring each field has a value before sending the request
    if (!sqft.value || !room || !bathrooms || !state.value || !acre_lot.value) {
        console.log("All fields are required.");
        return;
    }

    var url = "http://127.0.0.1:5000/predict_home_price";

    // Fixed JSON formatting: changed assignment operator '=' to ':' and added commas between key-value pairs
    $.post(url, {
        house_size: parseFloat(sqft.value),
        bed: room,
        state: state.value,
        bath: bathrooms,
        acre_lot: parseFloat(acre_lot.value)
    }, function(data, status) {
        console.log(data.estimated_price);
        // Fixed property access for estPrice to use innerHTML
        estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Dollars </h2>";
        console.log(status);
    });
}

function onPageLoad() {
    console.log("document loaded");
    var url = "http://127.0.0.1:5000/get_location_names";

    $.get(url, function(data, status) {
        console.log("got response for get_location_names request");
        if (data) {
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty();
            for (var i = 0; i < locations.length; i++) {
                var opt = new Option(locations[i]);
                $('#uiLocations').append(opt);
            }
        }
    });
}

window.onload = onPageLoad;
