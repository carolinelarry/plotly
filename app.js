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
});

    data=[{
        x: [0,10,20,30],
        y: [10,10,10,10],
        type: "bar",
        orientation: 'h'
    }];

    Plotly.newPlot("bar", data);
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
    //THIS WORKS!!!!
    function filterID(item){
        return item.id == selectedID;
    };   

    //This is the sample entry that has the same ID as selectedID
    //filtering samples array by filterID function
    var sampleItem = data.samples.filter(filterID);
    console.log(sampleItem);

      

        //var name = data.samples[0];
        //var samples_values = name.sample_values;
        //console.log(samples_values);
        //var otuIds = name.otu_ids;
        //console.log(data);
        // var ids = data.names;
        // console.log(ids);

        
    //Selecting top 10 sample_values for our sample_item
    var slicedData1 = sampleItem[0].sample_values.slice(0,10);
    console.log(slicedData1);
    var slicedData2 = sampleItem[0].otu_ids.slice(0,10);
    console.log(slicedData2);
        
        //Will return key value pairs for table
        var keys = Object.entries(data.metadata);
        //console.log(keys);
    
    // var x = [];
    // var y = [];

    //ADD THIS BACK AT END WHEN READY FOR GRAPH
    // var data = [{
    //      x = slicedData1,
    //      y = slicedData2,
    //      //type:"bar",
        
    //      }];

    var x = slicedData1;
    var y = slicedData2;

        

        //Finding value of our id
        // var idNum = dropdownMenu.property("value");
        // console.log(`idNum is ${idNum}`);
        
    //FIX LATER: X IS NOT DEFINED
    Plotly.restyle("bar", "x", [x]);
    Plotly.restyle("bar", "y", [y]);

    })

    
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