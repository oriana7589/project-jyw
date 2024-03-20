import React from 'react';
import ReactApexChart from 'react-apexcharts';

const ChartItemsCliente = ({ itemsComprados }) => {
  const arrayTransformado = Object.values(itemsComprados.reduce((acumulador, item) => {
    if (!acumulador[item.codigoInterno]) {
      acumulador[item.codigoInterno] = { 
        codigoInterno: item.codigoInterno, 
        codigoArticulo: item.codigoArticulo,
        descripcionArticulo: item.descripcionArticulo,
        cantidad: 0,
        total: 0
      };
    }
  
    acumulador[item.codigoInterno].cantidad += item.cantidad;
    return acumulador;
  }, {}));
 
 const top20 = itemsComprados.slice(0, 20);
  // Convertir los items comprados a la estructura de datos requerida para ApexCharts
  const options = {
    chart: {
      type: 'treemap'
    },
    title: {
      text: ''
    },
    series: [{
      data: top20.map(item => ({
        x: item.codigoArticulo,
        y: item.total
      }))
    }]
  };

  return (
    <ReactApexChart options={options} series={options.series} type="treemap" height= "90%" />
  );
};

export default ChartItemsCliente;
