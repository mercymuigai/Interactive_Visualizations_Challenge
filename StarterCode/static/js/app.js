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

    // Grab values from the  json object to build the bubble chart and a pie chart
        console.log(data.samples)
    var metadata = data.metadata

    var sampleIds = metadata.filter(row => row.id == value);    console.log(samplesOtuId);
    
         var x = data.samples.otu_ids;
         console.log(x);
         var y = data.samples.sample_values;
         var size = data.sample_values;
         var color = data.otu_ids;
         var labels = data.otu_labels;
      
      var trace1 ={
        x:x,
        y:y,
        text:labels,
        mode:'markers',
        marker:{
          color: color,
          size: size,
          colorscale:"earth" 
        }
      };
      var bubbleData = [trace1];
      
      var bubbleLayout = {
        title: 'OTU IDS',
        
      };
      
      Plotly.newPlot('bubble', bubbleData, bubbleLayout);
});
  // making a pie chart
var trace = [{
    values: x.slice(0,10), 
    labels: labels.slice (0,10),
    type: "pie"
  }];
  
  var pieData = [trace];

  var pieLayout = {
    title: "'Top 10 OTU",
};
  Plotly.plot("pie", pieData, pieLayout);

}

function optionChanged(value) {
    buildMetadata(value)
    buildCharts(value)
};




