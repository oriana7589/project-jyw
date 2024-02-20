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


export default class ChartItemsCliente extends PureComponent {
  static demoUrl = "https://codesandbox.io/s/simple-bar-chart-tpz8r";

  render() {
    const { dataGraficaActual, dataGraficaAnterior } = this.props;
    var dataCombinada = [];
    var totalKeyAnterior = "";
    var totalKeyActual = "";

    const obtenerNombrePropiedadTotal = (objeto) => {
      const nombresPropiedades = Object.keys(objeto);
      const nombrePropiedadTotal = nombresPropiedades.find(nombre => nombre.startsWith('Total'));
      return nombrePropiedadTotal;
    }

    if (dataGraficaActual && dataGraficaAnterior && dataGraficaActual.length > 0 && dataGraficaAnterior.length > 0) {
  

      dataCombinada = dataGraficaAnterior.map((itemAnterior, index) => {
        const itemActual = dataGraficaActual[index];
        return {
          ...itemAnterior,
          ...itemActual,
        };
      });    
      totalKeyAnterior = obtenerNombrePropiedadTotal(dataGraficaAnterior[0]);
      totalKeyActual = obtenerNombrePropiedadTotal(dataGraficaActual[0]);
     } else {
      dataCombinada = [
        { Mes: "Enero", Total: 0 },
        { Mes: "Febrero", Total: 0 },
        { Mes: "Marzo", Total: 0 },
        { Mes: "Abril", Total: 0 },
        { Mes: "Mayo", Total: 0 },
        { Mes: "Junio", Total: 0 },
        { Mes: "Julio", Total: 0 },
        { Mes: "Agosto", Total: 0 },
        { Mes: "Septiembre", Total: 0 },
        { Mes: "Octubre", Total: 0 },
        { Mes: "Noviembre", Total: 0 },
        { Mes: "Diciembre", Total: 0 },
      ];      
     }         

    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={300}
          height={100} 
          data={dataCombinada}          
          margin={{
            top: 8,
            right: 40,
            left: 10,
            bottom: 80,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Mes" angle={-45} interval={0} textAnchor="end" fontSize={"0.8rem"} />
          <YAxis fontSize={"0.8rem"} tickCount={9}/>
          <Tooltip />
          <Bar
            dataKey={totalKeyAnterior}            
            fill="rgb(12, 55, 100)"
            activeBar={<Rectangle fill="rgb(12, 55, 100)" stroke="rgb(12, 55, 100)" />}            
          /> 
          <Bar
            dataKey={totalKeyActual}            
            fill="rgb(255, 168, 0)"
            activeBar={<Rectangle fill="rgb(255, 168, 0)" stroke="rgb(255, 168, 0)" />}
            // Utiliza dataGraficaAnterior en lugar de data
          />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
