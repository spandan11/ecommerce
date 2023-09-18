import React from 'react';
import { Card, Title, AreaChart } from "@tremor/react";

const chartdata = [
    {
        date: "Jan 22",
        Products: 2890,
        Sales: 2338,
    },
    {
        date: "Feb 22",
        Products: 2756,
        Sales: 2103,
    },
    {
        date: "Mar 22",
        Products: 3322,
        Sales: 2194,
    },
    {
        date: "Apr 22",
        Products: 3470,
        Sales: 2108,
    },
    {
        date: "May 22",
        Products: 3475,
        Sales: 1812,
    },
    {
        date: "Jun 22",
        Products: 3129,
        Sales: 1726,
    },
];

const dataFormatter = (number) => {
    return "$ " + Intl.NumberFormat("us").format(number).toString();
};

const PerformanceChart = () => (
    <Card className='ring-0'>
        <Title className='text-2xl'>Revenue Over Time (USD)</Title>
        <AreaChart
            className="h-72 mt-4 p-15"
            data={chartdata}
            index="date"
            categories={["Products", "Sales"]}
            colors={["indigo", "black"]}
            valueFormatter={dataFormatter}
        />
    </Card>
);

export default PerformanceChart;
