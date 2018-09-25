queue()
    .defer(d3.json, "transactions.json")
    .await(makeCharts);


function makeCharts(error, transactionsData) {



    let ndx = crossfilter(transactionsData);

    // taking our data and turning it into a crossfilter instance


    // let nameDim = ndx.dimenssion(function(d) {
    //     return d.name;
    // });

    let nameDim = ndx.dimension(dc.pluck("name"));
    // dimension represents x axis
    // dc is the dimenstional charting library

    let totalSpendPerPerson = nameDim.group().reduceSum(dc.pluck("spend"));
    // group represents y axis

    let spendChart = dc.barChart("#chart-goes-here");
    // dc.barChart is a built in function to create a chart

    // dc.barChart creates a bar chart from dc library



    let personColors = d3.scale.ordinal().range(["red", "blue", "green"]);

    spendChart
        .width(300)
        .height(150)
        .colorAccessor(function(d) {
            return d.key
        })
        .colors(personColors)
        .dimension(nameDim)
        .group(totalSpendPerPerson)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Person")
        .yAxis().ticks(8)


    let storeDim = ndx.dimension(dc.pluck("store"));
    let totalSpendPerStore = storeDim.group().reduceSum(dc.pluck("spend"));

    let storeChart = dc.barChart("#store-chart");

    storeChart
        .width(300)
        .height(150)
        .dimension(storeDim)
        .group(totalSpendPerStore)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Store")
        .yAxis().ticks(4)





    // let stateDim = ndx.dimension(dc.pluck("state"));
    // let totalSpendPerState = stateDim.group().reduceSum(dc.pluck("spend"));

    // let stateChart = dc.barChart("#state-chart");


    // stateChart
    //     .width(300)
    //     .height(150)
    //     .dimension(stateDim)
    //     .group(totalSpendPerState)
    //     .x(d3.scale.ordinal())
    //     .xUnits(dc.units.ordinal)
    //     .xAxisLabel("State")
    //     .yAxis().ticks(4)


    let stateDim = ndx.dimension(dc.pluck("state"));
    let totalSpendPerState = stateDim.group().reduceSum(dc.pluck("spend"));

    let stateChart = dc.pieChart("#state-chart");


    stateChart
        .width(300)
        .radius(150)
        .dimension(stateDim)
        .group(totalSpendPerState)











    dc.renderAll();
}
