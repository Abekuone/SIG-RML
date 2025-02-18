// PieChart.js
import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
//import HighchartsExporting from 'highcharts/modules/exporting';
//import HighchartsAccessibility from 'highcharts/modules/accessibility';

// Initialiser les modules
//HighchartsExporting(Highcharts);
//HighchartsAccessibility(Highcharts);

const PieChart2 = () => {
    useEffect(() => {
        Highcharts.chart('chart2', {
            chart: {
                type: 'pie'
            },
            title: {
                text: 'Egg Yolk Composition'
            },
            tooltip: {
                valueSuffix: '%'
            },
            subtitle: {
                text: 'Source:<a href="https://www.mdpi.com/2072-6643/11/3/684/htm" target="_blank" rel="noopener noreferrer">MDPI</a>'
            },
            plotOptions: {
                series: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: [{
                        enabled: true,
                        distance: 20
                    }, {
                        enabled: true,
                        distance: -40,
                        format: '{point.percentage:.1f}%',
                        style: {
                            fontSize: '1.2em',
                            textOutline: 'none',
                            opacity: 0.7
                        },
                        filter: {
                            operator: '>',
                            property: 'percentage',
                            value: 10
                        }
                    }]
                }
            },
            series: [{
                name: 'Percentage',
                colorByPoint: true,
                data: [
                    { name: 'Water', y: 55.02 },
                    { name: 'Fat', sliced: true, selected: true, y: 26.71 },
                    { name: 'Carbohydrates', y: 1.09 },
                    { name: 'Protein', y: 15.5 },
                    { name: 'Ash', y: 1.68 }
                ]
            }]
        });
    }, []);

    return (
        <figure className="highcharts-figure">
            <div id="chart2" style={{ height: '400px' }}></div>
            <p className="highcharts-description">
                Pie charts are very popular for showing a compact overview of a
                composition or comparison. While they can be harder to read than
                column charts, they remain a popular choice for small datasets.
            </p>
        </figure>
    );
};

export default PieChart2;