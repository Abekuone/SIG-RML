import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
//import {exporting} from 'highcharts/modules/exporting';
//import {accessibility} from 'highcharts/modules/accessibility';

// Vérifier si Highcharts est bien défini avant d'appliquer les modules


const LineChart = () => {
    useEffect(() => {
        Highcharts.chart('linechart', {
            chart: {
                type: 'column' // Type de graphique : histogramme
            },
            title: {
                text: 'Composition du Jaune d\'Œuf'
            },
            subtitle: {
                text: 'Source : <a href="https://www.mdpi.com/2072-6643/11/3/684/htm" target="_blank" rel="noopener noreferrer">MDPI</a>'
            },
            xAxis: {
                categories: ['Water', 'Fat', 'Carbohydrates', 'Protein', 'Ash'],
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Pourcentage (%)',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: '%'
            },
            plotOptions: {
                column: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            series: [{
                name: 'Pourcentage',
                data: [55.02, 26.71, 1.09, 15.5, 1.68] // Données pour chaque catégorie
            }]
        });
    }, []);

    return (
        <figure className="highcharts-figure">
            <div id="linechart" style={{ height: '400px' }}></div>
            <p className="highcharts-description">
                Les histogrammes sont très populaires pour montrer une comparaison entre différentes catégories. Ils sont faciles à lire et à interpréter.
            </p>
        </figure>
    );
};

export default LineChart;