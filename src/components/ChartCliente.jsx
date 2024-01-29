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


export default class ChartCliente extends PureComponent {
  static demoUrl = "https://codesandbox.io/s/simple-bar-chart-tpz8r";

  render() {
    const { dataGraficaActual, dataGraficaAnterior } = this.props;

     if (!dataGraficaActual || !dataGraficaAnterior || dataGraficaActual.length === 0 || dataGraficaAnterior.length === 0) {
      console.log("IMPRIMIENDO DATOS DE GRAFICA ACTUAL", dataGraficaActual);
      console.log("IMPRIMIENDO DATOS DE GRAFICA ANTERIOR", dataGraficaAnterior);
       return null;  // Si los datos aún no están disponibles, no renderiza nada
     }

    console.log("IMPRIMIENDO DATOS DE GRAFICA ACTUAL", dataGraficaActual);
    console.log("IMPRIMIENDO DATOS DE GRAFICA ANTERIOR", dataGraficaAnterior);
   
    const dataCombinada = dataGraficaAnterior.map((itemAnterior, index) => {
      const itemActual = dataGraficaActual[index];
      return {
        ...itemAnterior,
        ...itemActual,
      };
    });

    console.log("IMPRIMIENDO DATA COMBINADA", dataCombinada);

    const obtenerNombrePropiedadTotal = (objeto) => {
      const nombresPropiedades = Object.keys(objeto);
      console.log('nombresPropiedad', nombresPropiedades)
      const nombrePropiedadTotal = nombresPropiedades.find(nombre => nombre.startsWith('Total'));
      console.log('nombresPropiedadTotal', nombrePropiedadTotal)
      return nombrePropiedadTotal;
    }

    const totalKeyAnterior = obtenerNombrePropiedadTotal(dataGraficaAnterior[0]);
    const totalKeyActual = obtenerNombrePropiedadTotal(dataGraficaActual[0]);

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
          <YAxis fontSize={"0.8rem"} />
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
