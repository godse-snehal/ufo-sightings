// from data.js
var tableData = data;

// Reference the input
var input = d3.select("#datetime");
var city = d3.select("#select-city");
var state = d3.select("#select-state");
var shape = d3.select("#select-shape");

// var inputShape = document.getElementById("select-shape");

// Reference the form button
var button = d3.select("#filter-btn");

// Reference the table body
var body = d3.select("tbody");


function populateOptions(arr, select) {
    for (var i=0; i<arr.length; i++) {
        var option = document.createElement("OPTION"), 
                txt = document.createTextNode(arr[i]);
        option.appendChild(txt);
        option.setAttribute("value", arr[i]);
        select.insertBefore(option, select.lastChild);
    }
}

// Populate cities in the dropdown
var cityList = tableData.map(record => record.city);
var distinctCities = [...new Set(cityList)].sort();
var selectCity = document.getElementById("select-city"), distinctCities;
populateOptions(distinctCities, selectCity);

// Populate states in the dropdown
var stateList = tableData.map(record => record.state);
var distinctStates = [...new Set(stateList)].sort();
var selectState = document.getElementById("select-state"), distinctStates;
populateOptions(distinctStates, selectState);

// Populate shapes in the dropdown
var shapeList = tableData.map(record => record.shape);
var distinctShapes = [...new Set(shapeList)].sort();
var selectShape = document.getElementById("select-shape"), distinctShapes;
populateOptions(distinctShapes, selectShape);


// Define variables
var inputDate;
var inputCity;
var inputState;
var inputShape;


// Event handler function
function handleClick(event) {

    inputDate = input.property("value");
    inputCity = city.property("value");
    inputState = state.property("value");
    inputShape = shape.property("value");
    
    // selectedCity = inputCity.options[inputCity.selectedIndex].text;

    // Create form values object
    var formValues = {};
    if (inputDate) {
        console.log(`Input date is : ${inputDate}`);
        var d = new Date(inputDate);
        var convertedDate = (d.getMonth() + 1) + "/" + (d.getDate() + 1) + "/" + d.getFullYear();
        console.log(`Converted date is ${convertedDate}`);
        formValues["datetime"] = convertedDate;
    }
    if (inputCity !== " ") {
        formValues["city"] = inputCity;
    }
    if (inputState !== " ") {
        formValues["state"] = inputState;
    }
    if (inputShape !== " ") {
        formValues["shape"] = inputShape;
    }
    
    // Filter by input data
    var filteredRecords = tableData.filter(function(item) {
        for (var key in formValues) {
            if (item[key] != formValues[key])
            return false;
        }
        return true;
    });

    // Reset error message
    document.getElementById("error").innerHTML = "";
     
    // Data not found
    if (filteredRecords.length == 0) {
        document.getElementById("error").innerHTML = "<br>Invalid data.";
    }
    
    // Delete old data
    body.text("");
    
    // Populate filtered data
    filteredRecords.forEach((record) => {
        var row = body.append("tr");
        Object.entries(record).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
        });
    });
      

}


button.on("click", handleClick);
