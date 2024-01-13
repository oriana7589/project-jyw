import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Enero",
    Monto: 4000,
   
  },
  {
    name: "Febrero",
    Monto: 3000,
  },
  {
    name: "Marzo",
    Monto: 2000,
  },
  {
    name: "Abril",
    Monto: 2780,
  },
  {
    name: "Mayo",
    Monto: 1890,
  },
  {
    name: "Junio",
    Monto: 2390,
  },
  {
    name: "Julio",
    Monto: 3490,
  },
  {
    name: "Agosto",
    Monto: 2780,
  },
  {
    name: "Setiembre",
    Monto: 1890,
  },
  {
    name: "Octubre",
    Monto: 2390,
  },
  {
    name: "Noviembre",
    Monto: 3490,
  },
  {
    name: "Diciembre",
    Monto: 2390,
  },
  
];

export default class ChartCliente extends PureComponent {
  static demoUrl = "https://codesandbox.io/s/simple-bar-chart-tpz8r";

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%" >
        <BarChart
          width={300}
          height={100}
          data={data}
          margin={{
            top: 8,
            right: 40,
            left: 10,
            bottom: 80,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-45} interval={0} textAnchor="end" fontSize={"0.8rem"} />
          <YAxis fontSize={"0.8rem"}/>
          <Tooltip />
          <Bar
            dataKey="Monto"
            fill="rgb(12, 55, 100)"
            activeBar={<Rectangle fill="rgb(12, 55, 100)" stroke="rgb(12, 55, 100" />}
          />
          <Bar
          dataKey="Monto"
          fill="rgb(255, 168, 0)"
          activeBar={<Rectangle fill="rgb(255, 168, 0)" stroke="rgb(255, 168, 0" />}
          />           
          
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
