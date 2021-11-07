import axios from 'axios';
import { round } from 'components/utils/format';
import { Base_URL } from 'components/utils/requests';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { SaleSuccess } from 'types/sale';

type SeriesData = {
    name: string;
    data: number[];
}

type ChartData = {
    labels: {
        categories: string[];
    };
    series: SeriesData[];
}

const BarChart = () =>{

    const [chartData, setChartData] = useState<ChartData>({
        labels: {
            categories: []
        },
        series: [
            {
                name: "",
                data: []                   
            }
        ]
    });

    useEffect(()=> {
        axios.get(`${Base_URL}/sales/success-by-seller`)
        .then(response => {
            const data = response.data as SaleSuccess[];
            const myLabels = data.map(x => x.sellerName);
            const mySeries = data.map(x => round(100.0 * x.deals / x.visited , 1));
    
            setChartData ({
                labels: {
                    categories: myLabels
                },
                series: [
                    {
                        name: "% de Sucesso",
                        data: mySeries                   
                    }
                ]
            });
        });
    }, []);

const options = {
    plotOptions: {
        bar: {
            horizontal: true,
        }
    },
};

return (
    <Chart 
        options={{ ...options, xaxis: chartData.labels}}
        series={chartData.series}
        type="bar"
        heigth="240"
    />
)
};

export default BarChart;