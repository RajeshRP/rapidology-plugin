google.load('visualization', '1.1', {packages: ['line']});

function rapidology_chart_init($period, $stats, $list_id){
    google.setOnLoadCallback(rapidology_drawChart);
    rapidology_drawChart($period, $stats, $list_id);



}



function rapidology_drawChart($period, $stats, $list_id){
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Date');
    data.addColumn('number', 'Optins');
    if($period == 12){
        chartData = chart_data_generate_12($stats, $list_id);
        var chart_title = 'Optins Past 12 Months'
        for(var rowData in chartData){
            var year    = chartData[rowData].year;
            var month   = chartData[rowData].month - 0;
            var date    = chartData[rowData].date;
            var converstions = chartData[rowData].converstions;
            if(month != 0){
                data.addRow([month.pad()+'/'+year, converstions]);
            }
        }
    }else if($period == 30){
        chartData = chart_data_generate_30($stats, $list_id);
        var chart_title = 'Optins Past 30 Days';
        for(var rowData in chartData){
            var year    = chartData[rowData].year;
            var month   = chartData[rowData].month - 1;
            var day     = chartData[rowData].day;
            var date    = chartData[rowData].date;
            var converstions = chartData[rowData].converstions;
            data.addRow([month+'/'+day, converstions]);
        }
    }//end period 30

    var options = {
        chart: {
            title: chart_title,
            hAxis:{showTextEvery:1},
        },
        vAxis: {minValue:0},
    };
    var div = document.createElement("div");
    div.setAttribute('class', 'rapidology_line_chart');
    var container = document.querySelector('.rad_dashboard_lists_stats_graph_container')
    container.appendChild(div);
    var chart = new google.charts.Line(document.querySelector('.rapidology_line_chart'));
    chart.draw(data, options);

    function resizeCharts () {
        // redraw charts, dashboards, etc here


        chart.draw(data, options);


    }
    var lastExection = 0;
    if (window.addEventListener) {
        window.addEventListener('resize', function(event) {
            var now = Date.now();
            if (now - lastExection < 100) {
                console.log('less than');
                jQuery('#rapidology_line_chart').removeAttr('style');
                return
            }
            console.log('less than 2');
            jQuery('#rapidology_line_chart').removeAttr('margin-left', '10000px');
            lastExection = Date.now();

            setTimeout(function(){
                jQuery('#rapidology_line_chart').removeAttr('style');
                resizeCharts();
            }, 1000);


        });
    }
    if (window.attachEvent) {
        window.attachEvent('onresize', function(event){
            var now = Date.now();
            if(now - lastExection < 1000){
                return;
            }
            lastExection = Date.now();
            resizeCharts();
        }, false);
    }

}
