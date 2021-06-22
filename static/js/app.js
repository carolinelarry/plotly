//<select id="selDataset" onchange="optionChanged(this.value)"></select>

d3.select("#selDataset").on("change", updatePlotly);

function updatePlotly(){
    var dropdownMenu = d3.select("#selDataset");
    var idValue = dropdownMenu.property("value");

    var x = [];
    var y= [];

    //create for loop for ids?

    if(idValue === 'id940'){
        x = [samples.samples.sample_values];
        console.log(x);
        y = [samples.samples.otu_ids];
        console.log(y);
    };

    var data = [{
        x: x,
        y: y,
    }];

    Plotly.newPlot("bar", data);
    

};