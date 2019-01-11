
// Render the plot to the div tag with id "plot"
Plotly.newPlot("plot", data, layout);
var trace1 = {
    x: data.map(row => row.Year),
    y: data.map(row => row.DisasterTotal),
    name: "All Disasters",
    type: "scatter"
};

var trace2 = {
    x: data.map(row => row.Year),
    y: data.map(row => row.Hurricanes),
    name: "Hurricanes",
    type: "scatter"
};

var trace3 = {
    x: data.map(row => row.Year),
    y: data.map(row => row.Earthquakes),
    name: "Earthquakes",
    type: "scatter"
};

var trace4 = {
    x: data.map(row => row.Year),
    y: data.map(row => row.Floods),
    name: "Floods",
    type: "scatter"
};

var trace5 = {
    x: data.map(row => row.Year),
    y: data.map(row => row.Tornadoes),
    name: "Tornadoes",
    type: "scatter"
};

var trace6 = {
    x: data.map(row => row.Year),
    y: data.map(row => row.Fires),
    name: "Fires",
    type: "scatter"
};


// set up the data variable
var data = [trace1, trace2, trace3, trace4, trace5, trace6];

// set up the layout variable
var layout = {
    title: "National Disaster Summary",
    xaxis: { title: "Year" },
    yaxis: { title: "Number of Disaster Events" }
  };

// Note that we omitted the layout object this time
// This will use default parameters for the layout
Plotly.newPlot("plot", data, layout);


