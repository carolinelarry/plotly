//<select id="selDataset" onchange="optionChanged(this.value)"></select>


//d3.select("#selDataset").on("change", updatePlotly);

// d3.json(samples.json).then(function(data) {
//     console.log(data);
// });

// const dataPromise = d3.json(samples.json);
// console.log("Data Promise: ", dataPromise);



//Since we have json within a json, this will get you sample_values array; before it was just json
function buildPLot(){
    d3.json("samples.json").then(function(data) {
        var name = data.samples[0];
        var samples_values = name.sample_values;
        //console.log(samples_values);
        var labels = name.otu_ids;
        //console.log(data);
        var ids = data.names;
        console.log(ids);

        //Slice for plotting
        var slicedData1 = samples_values.slice(0,10);
        //console.log(slicedData1);
        var slicedData2 = String(labels.slice(0,10));
        //console.log(slicedData2);
        
        //Will return key value pairs for table
        var keys = Object.entries(data.metadata);
        //console.log(keys);

        var data = [{
            x: slicedData1,
            y: slicedData2,
            type:"bar",
        
        }];

        //This works and shows up in dropdown but shows up as undefined
        var dropdownMenu = d3.select("#selDataset")
         ids.forEach(item => (dropdownMenu.html(function(item) {
             return `<option value="${item}">${item}</option>`})));

        

        

        Plotly.newPlot("bar", data);

    })

    
}

buildPLot();






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