//the graph starts here
var trace2 = {
    x: data.map(row => row.Year),
    y: data.map(row => row.Hurricanes),
    name: "Hurricanes",
    type: "bar",
    marker :{color :"#b1cbbb"}

};

var trace3 = {
    x: data.map(row => row.Year),
    y: data.map(row => row.Earthquakes),
    name: "Earthquakes",
    type: "bar",
    marker :{color :"#eeac99"}
};

var trace4 = {
    x: data.map(row => row.Year),
    y: data.map(row => row.Floods),
    name: "Floods",
    type: "bar",
    marker :{color :"#87bdd8"}
};

var trace5 = {
    x: data.map(row => row.Year),
    y: data.map(row => row.Tornadoes),
    name: "Tornadoes",
    type: "bar",
    marker :{color :"#bccad6"}
};

var trace6 = {
    x: data.map(row => row.Year),
    y: data.map(row => row.Fires),
    name: "Fires",
    type: "bar",
    marker :{color :"#d96459"}
};


// set up the data variable
var data = [trace2, trace3, trace4, trace5, trace6];

// set up the layout variable
var layout = {
    title: "National Disaster Summary",
    xaxis: { title: "Year" },
    yaxis: { title: "Number of Disaster Events" },
    barmode: 'stack',

  };

// Note that we omitted the layout object this time
// This will use default parameters for the layout
Plotly.newPlot("plot", data, layout);
