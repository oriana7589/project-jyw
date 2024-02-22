import React, { useState, useEffect, useRef } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CircleIcon from "@mui/icons-material/Circle";
import es from "date-fns/locale/es";
import TableCliente from "../components/TableCliente";
import ChartCliente from "../components/ChartCliente";
import TableItemsCliente from "../components/TableItemsCliente";
import ChartItemsCliente from "../components/ChartItemsCliente";

export default function DashboardItems({ itemsComprados }) {
  const [selectedDate1, setSelectedDate1] = useState(
    new Date(new Date().getFullYear() - 1, 0, 1)
  );
  const [selectedDate2, setSelectedDate2] = useState(new Date());

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Monto",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255, 99, 132, 0.4)",
        hoverBorderColor: "rgba(255, 99, 132, 1)",
        data: [],
      },
    ],
  });

  const handleDateChange1 = (date) => {
    setSelectedDate1(date);

    const fechaAzul = date.getFullYear();
    const fechaDorada = selectedDate2.getFullYear();

    onCambiarFechaGrafica([fechaDorada, fechaAzul]);
    // ... (resto del código)
  };

  const openCalendar1 = () => {
    setCalendarOpen1(true);
  };

  const closeCalendar1 = () => {
    setCalendarOpen1(false);
  };

  const handleDateChange2 = (date) => {
    setSelectedDate2(date);

    const fechaAzul = selectedDate1.getFullYear();
    const fechaDorada = date.getFullYear();

    onCambiarFechaGrafica([fechaDorada, fechaAzul]);
    // ... (resto del código)
  };

  const openCalendar2 = () => {
    setCalendarOpen2(true);
  };

  const closeCalendar2 = () => {
    setCalendarOpen2(false);
  };

  useEffect(() => {
    // Agrega el evento de clic al año después de que el componente se haya montado
    const yearElement = document.querySelector(".react-datepicker__year-text");
    if (yearElement) {
      yearElement.addEventListener("click", closeCalendar1);
    }

    return () => {
      // Limpia el evento al desmontar el componente
      if (yearElement) {
        yearElement.removeEventListener("click", closeCalendar1);
      }
    };
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        maxWidth="false"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          bgcolor: "#ffffff",
          height: "calc(100vh - 17.6rem)",
        }}
      >
        <div style={{ flex: "30%", }}>
          <ChartItemsCliente itemsComprados={itemsComprados} />
        </div>
        <div style={{ flex: "70%",}}>
          <TableItemsCliente itemsComprados={itemsComprados} />
        </div>
      </Container>
    </React.Fragment>
  );
}
