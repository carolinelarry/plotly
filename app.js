//Initialzing function
function init(){
d3.json("samples.json").then(function(data){
    var dropdownMenu = d3.select("#selDataset");

    var ids = data.names;
        
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

    //var xBar940 = slicedData1940;
    //It's using the index instead of the value
    var yBar940 = slicedData2940.map(x => `ID ${x}`);
    //console.log(yBar940);

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

    var xBubble940 = OtuID940;
    var yBubble940 = sampleValues940;

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

    Plotly.newPlot("bubble", dataBubble940, layout, config);


    //function to get entry for metadata with id that matches selectedID
    // function filterKeys(item){
    //     return item.id == 940;
    // };

    //DEMOGRAPHIC INFO SECTION
    //Calling that function on our data entry
    var demBox940 = data.metadata.filter(id940);
    //console.log(`demInfo is ${demBox940}`);

    var demInfoJson = demBox940[0];
    console.log(demInfoJson);

    //var demInfoKeys = Object.keys(demInfoJson);
    //console.log(demInfoKeys);

    var demInfoPanel = d3.select("#sample-metadata");

    demInfoPanel.html('');
    Object.entries(demInfoJson).map(([key, value]) => {
        demInfoPanel.append("p").html(`<b>${key}:</b> ${value}`)
    });




});

    //INIT FUNCTION
    // dataBar =[{
    //     x: [10,20,30,40],
    //     y: ["ID 1", "ID 2", "ID 3", "ID 4"],
    //     text: ['Text 1', 'Text 2', 'Text 3', 'Text 4'],
    //     type: "bar",
    //     orientation: 'h'
    // }];

    // Plotly.newPlot("bar", dataBar);

    // dataHover = [{
    //     x: [10,20,30,40],
    //     y: [10,12,13,14],
    //     mode: 'markers',
    //     marker: {size:[40,60,80,100], color: ['green', 'green', 'green', 'green']}

    // }];

    // Plotly.newPlot("bubble", dataHover);
    //END OF INIT FUNCTION



};


//When you change dropdown option, calls buildPlot function
d3.selectAll("#selDataset").on("change", buildPlot);

//Overall function
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


    //Finding name of selected id
    var selectedID = dropdownMenu.property("value");
    //console.log(selectedID);

        //var new1 = data.samples.id;
        //console.log(new1);

    //Creating function that finds id that is equal to selectedID 
    function filterID(item){
        return item.id == selectedID;
    };   

    //This is the sample entry that has the same ID as selectedID
    //filtering samples array by filterID function
    var sampleItem = data.samples.filter(filterID);
    //console.log(sampleItem);

      

        //var name = data.samples[0];
        //var samples_values = name.sample_values;
        //console.log(samples_values);
        //var otuIds = name.otu_ids;
        //console.log(data);
        // var ids = data.names;
        // console.log(ids);

        
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

    //DEMOGRAPHIC INFO SECTION
    //Calling that function on our data entry
    var demInfo = data.metadata.filter(filterKeys);
    //console.log(demInfo);

    var demInfoJson = demInfo[0];
    //console.log(demInfoJson);

    //var demInfoKeys = Object.keys(demInfoJson);
    //console.log(demInfoKeys);

    var demInfoPanel = d3.select("#sample-metadata");

    demInfoPanel.html('');
    Object.entries(demInfoJson).map(([key, value]) => {
        demInfoPanel.append("p").html(`<b>${key}:</b> ${value}`)
    });

    //console.log(demInfoEntries);

    //Placing key/value pairs in html file
    //var demInfoID = d3.select("#sample-metadata")//.text(demInfoEntries);

    // demInfoEntries.forEach((item) => {
    //     demInfoID.text(item);
    // }

    //)



    var xBar = slicedData1;
    //It's using the index instead of the value
    var yBar = slicedData2.toString();
    //console.log(y);


    //Selecting top 10 sample_values for our sample_item
    var sampleValues = sampleItem[0].sample_values;
    //console.log("Update")
    //console.log(sampleValues);
    //Selecting top 10 otu_ids for our sample_item
    var OtuID = sampleItem[0].otu_ids;
    //console.log(OtuID);
    //Selecting top 10 otu_labels for our sample_item
    var OtuLabels = sampleItem[0].otu_labels;
    //console.log(OtuLabels);

    var xBubble = OtuID;
    var yBubble = sampleValues;


    //It's using the index instead of the value
    var yBar = slicedData2.map(x => `ID ${x}`);
    //console.log(yBar940);

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

    var config = {responsive: true};
    Plotly.newPlot("bar", dataBar, layout1, config);



        

        //Finding value of our id
        // var idNum = dropdownMenu.property("value");
        // console.log(`idNum is ${idNum}`);
        
    //FIX LATER: X IS NOT DEFINED
    // Plotly.restyle("bar", "x", [xBar]);
    // Plotly.restyle("bar", "y", [yBar]);
    // Plotly.restyle("bar", "text", [hoverTextData]);

    // Plotly.restyle("bubble", "x", xBubble);
    // Plotly.restyle("bubble", "y", yBubble);
    // Plotly.restyle("bubble", "size", sampleValues);

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


    Plotly.newPlot("bubble", bubbleData, layout2, config);



    });

    
};

init();






//Original code
// function updatePlotly(){
//     var dropdownMenu = d3.select("#selDataset");
//     var idValue = dropdownMenu.property("value");

//     var x = [];
//     var y= [];

//     //create for loop for ids?

//     if(idValue === 'id940'){
//         x = [samples.samples.sample_values];
//         console.log(x);
//         y = [samples.samples.otu_ids];
//         console.log(y);
//     };

//     var data = [{
//         x: x,
//         y: y,
//     }];

//     Plotly.newPlot("bar", data);
    

// };