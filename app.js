//Initialzing function
function init(){
d3.json("samples.json").then(function(data){
    var dropdownMenu = d3.select("#selDataset");

    //Getting ids to populate dropdown menu
    var ids = data.names;
        
    //Populating dropdown menu
    ids.forEach((sample) => {
        dropdownMenu
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    //Picking up array with id=940 to use as our initial data
    function id940(item){
        return item.id == 940;
    };   

    //Filtering data to where id=940
    var initPlotData = data.samples.filter(id940);
    //console.log(initPlotData);


    //Creating bar graph

    //Selecting top 10 sample_values for our sample_item
    var slicedData1940 = initPlotData[0].sample_values.slice(0,10);
    //console.log(slicedData1940);

    //Selecting top 10 otu_ids for our sample_item
    var slicedData2940 = initPlotData[0].otu_ids.slice(0,10);
    //console.log(slicedData2940);

    //Selecting top 10 otu_labels for our sample_item
    var hoverTextData940 = initPlotData[0].otu_labels.slice(0,10);
    //console.log(hoverTextData940);

    
    //Creating our y axis labels
    var yBar940 = slicedData2940.map(x => `ID ${x}`);
    //console.log(yBar940);

    //Creating data for bar graph for id 940
    var dataBar = [{
        x: slicedData1940.reverse(),
        y: yBar940.reverse(),
        text: hoverTextData940.reverse(),
        type: 'bar',
        orientation: 'h'
    }];

    var layout = {
        title: "Top 10 Bacteria Cultures Found"
    }

    var config = {responsive: true};
    Plotly.newPlot("bar", dataBar, layout, config);

    //Creating bubble graph

    //Selecting top 10 sample_values for our sample_item
    var sampleValues940 = initPlotData[0].sample_values;
    //console.log(sampleValues940);

    //Selecting top 10 otu_ids for our sample_item
    var OtuID940 = initPlotData[0].otu_ids;
    //console.log(OtuID940);

    //Selecting top 10 otu_labels for our sample_item
    var OtuLabels940 = initPlotData[0].otu_labels;
    //console.log(OtuLabels940);

    //Creating variables for x and y values for bubble graph for id 940
    var xBubble940 = OtuID940;
    var yBubble940 = sampleValues940;

    //Data for id 940, bubble chart
    var dataBubble940 = [{
            x: xBubble940,
            y: yBubble940.reverse(),
            text: OtuLabels940,
            mode: 'markers',
            marker: {size: sampleValues940, color: xBubble940}
    
        }];

    var layout = {
        title: "Bacteria Cultures Per Sample"
    }

    //Plotting bubble chart for id 940
    Plotly.newPlot("bubble", dataBubble940, layout, config);


    //Demographic info box section

    //Filtering our metadata to find info in id 940
    var demBox940 = data.metadata.filter(id940);
    //console.log(`demInfo is ${demBox940}`);

    var demInfoJson = demBox940[0];
    //console.log(demInfoJson);

    //Selecting id where we are going to place dem. info keys/ values
    var demInfoPanel = d3.select("#sample-metadata");

    //Clearing out any info that's in the dem. info box
    demInfoPanel.html('');

    //Placing key/ value pairs for id 940
    Object.entries(demInfoJson).map(([key, value]) => {
        demInfoPanel.append("p").html(`<b>${key}:</b> ${value}`)
    });

});


};


//When you change dropdown option, calls buildPlot function
d3.selectAll("#selDataset").on("change", buildPlot);

//Function when dropdown menu is changed
function buildPlot(){
    d3.json("samples.json").then(function(data) {

    //Sets up dropdown menu with ids
    var dropdownMenu = d3.select("#selDataset");
    var ids = data.names;  
    ids.forEach((sample) => {
        dropdownMenu
        .append("option")
        .text(sample)
        .property("value", sample);
    });


    //Finding selected id
    var selectedID = dropdownMenu.property("value");
    //console.log(selectedID);

    //Creating function that finds id that is equal to selectedID 
    function filterID(item){
        return item.id == selectedID;
    };   

    //Filtering samples array by filterID function (by id that was selected)
    var sampleItem = data.samples.filter(filterID);
    //console.log(sampleItem);
        
    //Selecting top 10 sample_values for our sample_item
    var slicedData1 = sampleItem[0].sample_values.slice(0,10);
    //console.log(slicedData1);

    //Selecting top 10 otu_ids for our sample_item
    var slicedData2 = sampleItem[0].otu_ids.slice(0,10);
    //console.log(slicedData2);

    //Selecting top 10 otu_labels for our sample_item
    var hoverTextData = sampleItem[0].otu_labels.slice(0,10);
    //console.log(hoverTextData);
        
    //Will return key value pairs for table
    var keys = Object.entries(data.metadata);
    //console.log(keys);

    //function to get entry for metadata with id that matches selectedID
    function filterKeys(item){
        return item.id == selectedID;
    };

    //Demographic Info box section

    //Filtering our metadata by the selected id
    var demInfo = data.metadata.filter(filterKeys);
    //console.log(demInfo);

    var demInfoJson = demInfo[0];
    //console.log(demInfoJson);

    //Selecting id that we want to place our data into in html file
    var demInfoPanel = d3.select("#sample-metadata");

    demInfoPanel.html('');
    Object.entries(demInfoJson).map(([key, value]) => {
        demInfoPanel.append("p").html(`<b>${key}:</b> ${value}`)
    });

    //Creating graphs

    //Creating x and y variables for bar graph
    var xBar = slicedData1;
    var yBar = slicedData2.toString();
    //console.log(y);


    //Selecting top 10 sample_values for our sample_item
    var sampleValues = sampleItem[0].sample_values;
    //console.log(sampleValues);

    //Selecting top 10 otu_ids for our sample_item
    var OtuID = sampleItem[0].otu_ids;
    //console.log(OtuID);

    //Selecting top 10 otu_labels for our sample_item
    var OtuLabels = sampleItem[0].otu_labels;
    //console.log(OtuLabels);

    //Creating x and y variables for bubble chart
    var xBubble = OtuID;
    var yBubble = sampleValues;

    //Creating y axis labels 
    var yBar = slicedData2.map(x => `ID ${x}`);
    //console.log(yBar940);

    //Creating data for bar chart
    var dataBar = [{
        x: slicedData1.reverse(),
        y: yBar.reverse(),
        text: hoverTextData.reverse(),
        type: 'bar',
        orientation: 'h'
    }];

    var layout1 = {
        title: "Top 10 Bacteria Cultures Found"
    }

    //Plotting bar chart for selected id
    var config = {responsive: true};
    Plotly.newPlot("bar", dataBar, layout1, config);

        
    //FIX LATER: X IS NOT DEFINED
    // Plotly.restyle("bar", "x", [xBar]);
    // Plotly.restyle("bar", "y", [yBar]);
    // Plotly.restyle("bar", "text", [hoverTextData]);

    // Plotly.restyle("bubble", "x", xBubble);
    // Plotly.restyle("bubble", "y", yBubble);
    // Plotly.restyle("bubble", "size", sampleValues);

    //Creatind data array for bubble chart for selected id
    var bubbleData = [{
        x: xBubble,
        y: yBubble.reverse(),
        mode: 'markers',
        text: OtuLabels, 
        marker: {size: sampleValues, color: xBubble}
    }];

    var layout2 = {
        title: "Bacteria Cultures Per Sample"
    }

    //Plotting bubble chart
    Plotly.newPlot("bubble", bubbleData, layout2, config);



    });

    
};

init();

