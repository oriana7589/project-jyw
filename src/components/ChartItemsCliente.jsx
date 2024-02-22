import React from 'react';
import ReactApexChart from 'react-apexcharts';

const ChartItemsCliente = ({ itemsComprados }) => {
  const arrayTransformado = Object.values(itemsComprados.reduce((acumulador, item) => {
    if (!acumulador[item.codigoInterno]) {
      acumulador[item.codigoInterno] = { 
        codigoInterno: item.codigoInterno, 
        codigoArticulo: item.codigoArticulo, 
        cantidad: 0 
      };
    }
  
    acumulador[item.codigoInterno].cantidad += item.cantidad;
    return acumulador;
  }, {}));

 const top50 = arrayTransformado.sort((a, b) => b.cantidad - a.cantidad).slice(0, 30);
  // Convertir los items comprados a la estructura de datos requerida para ApexCharts
  const options = {
    chart: {
      type: 'treemap'
    },
    title: {
      text: ''
    },
    series: [{
      data: top50.map(item => ({
        x: item.codigoArticulo,
        y: item.cantidad
      }))
    }]
  };

  return (
    <ReactApexChart options={options} series={options.series} type="treemap" height= "90%" />
  );
};

export default ChartItemsCliente;
