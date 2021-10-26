google.charts.load('current', {'packages':['corechart']});
google.setOnLoadCallback(drawChart);

function drawChart(url, title, divChart, data) {
    var chartCount = 0;
    $.ajax({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        url: url,
        method: "POST",
        data: data,
        dataType: "JSON",
        success: function(chart_data) {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Total');
            data.addColumn('number', 'Count');

            $.each(chart_data, function(i, chart_data) {
                var name = chart_data.name;
                var count = chart_data.count;
                var nameCount = chart_data.name + ' (' + chart_data.count + ')';
                data.addRows([
                    [nameCount, count]
                ]);
                chartCount = chartCount + chart_data.count;
            });

            var options = {
                title: chartCount + ' ' + title
            };

            var chart = new google.visualization.PieChart(document.getElementById(divChart));
            chart.draw(data, options);
        }
    });

}