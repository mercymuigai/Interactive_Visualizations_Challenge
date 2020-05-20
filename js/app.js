// selecting the selDataset of the html to append the dropdown menu 
   var dropDown = d3.select("#selDataset");
//    reading the .json using d3
    d3.json("samples.json").then((data)=> {
       console.log(data);

       // getting the sample names and looping through them to append each and its values to the dropdown
       var samplesNames = data.names; 
       console.log(samplesNames);
       samplesNames.forEach((sample) => {
           dropDown.append("option")
                   .text(sample)
                   .property("value",sample);
            // console.log(dropDown);
    
       });

});

// building the metadata section of the dashboard
function buildMetadata (value) {
d3.json("samples.json").then((data)=> {
    console.log(data.metadata);
    var metadata = data.metadata
    var filteredMetadata = metadata.filter(row => row.id == value);
   var sampleMetadata =  filteredMetadata[0]

   // selecting the html sample-metadata section to add the metadata
       var metadataPanel = d3.select("#sample-metadata");
    // Update all of the plots any time that a new sample is selected.
       metadataPanel.html("");

       // use of object. entries to loop through the key-value pair of the me-
         //tadata and then appending the pairs
       Object.entries(sampleMetadata).forEach(([key,value]) => {
        console.log(key, value)
       metadataPanel.append('p')
                    .text(`${key},${value}`)

});
})
}
function buildCharts(value) {
    d3.json("samples.json").then((data)=> {

    // get the values from the  json  to build the bubble chart and a pie chart
        

    var sampleIds = data.samples.filter(row => row.id == value); 
    console.log(sampleIds)   
    console.log(sampleIds[0]);
    
        //  var x = data.samples.otu_ids;
        //  var y = data.samples.sample_values;

    var sampleValues = sampleIds[0].sample_values
    
    var sampleLabels = sampleIds[0].otu_ids;
    var sampleText = sampleIds[0].otu_labels
    
    // reference to the bubble in HTML File
    var bubbleChart = d3.select('#bubble')
    
    // Object that contains data to be plotted 
    var trace = {
      x: sampleLabels,
      y: sampleValues,
      mode: 'markers',
      text: sampleText,
      marker: { 
        size: sampleValues,
        color: sampleLabels,
        colorscale: 'Earth',
      }
    };

    var layout = {
      title: "Visualizing OTU-IDS",
      height: 500
    };

    // Ploting the bubble chart 
    var data = [trace];
    Plotly.newPlot('bubble', data, layout)
  


  // making a pie chart

    // getting a reference to the pie ID in HTML File
    var pieGraph = d3.select('#pie')

   // using the top 10 samples to make the pie chart...use slicing
    var chartValues = sampleValues.slice(0, 10);
    var chartLabels = sampleLabels.slice(0, 10);
    var chartText = sampleText.slice(0, 10);

    // Object that contains data to be plotted and specs for plotting
    var data = [{
      values: chartValues, 
      labels: chartLabels,
      type: "pie",
      text: chartText 
    }];

    var layout = {
      title: "Top 10 Samples",
      height: 600, 
      width: 450,
      colorway: ['Portland'],
    };

// plotting the pie chart
    Plotly.newPlot('pie', data, layout);

}
    )};

function optionChanged(value) {
    buildMetadata(value)
    buildCharts(value)
};




