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
import { CircularProgress } from "@mui/material";

export default function DashboardCliente({isLoading, dataGraficaActual, dataGraficaAnterior, dataDocumentos, promedioCompra, promedioItems, promedioComprasAlMes, onCambiarFechaGrafica } ) {
  const [selectedDate1, setSelectedDate1] = useState(new Date(new Date().getFullYear() - 1, 0, 1));
  const [selectedDate2, setSelectedDate2] = useState(new Date());
  const [calendarOpen1, setCalendarOpen1] = useState(false);
  const [calendarOpen2, setCalendarOpen2] = useState(false);
  
  const datePickerRef = useRef(null);
  const datePickerRef2 = useRef(null);

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
          height: "calc(100vh - 17.7rem)",
        }}
      >
        {isLoading && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 2,
                background: "rgba(255, 255, 255, 0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </div>
          )}
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", margin:"5px" }}>
            <CircleIcon
              style={{ marginRight: "8px", color: "rgb(12, 55, 100)" }}
            />
            <DatePicker
              ref={datePickerRef}
              selected={selectedDate1}
              onChange={handleDateChange1}
              open={calendarOpen1}
              onClickOutside={closeCalendar1}
              locale={es}
              dateFormat="yyyy"
              showYearPicker
              onInputClick={openCalendar1} // Añade este manejador para abrir el calendario en clic de entrada
            />
            <CalendarTodayIcon
              onClick={openCalendar1}
              style={{ cursor: "pointer", marginLeft: "5px" }}
            />

            <CircleIcon
              style={{ marginRight: "2px", marginLeft:"10px", color: "rgb(255, 168, 0)" }}
            />
            <DatePicker
              ref={datePickerRef2}
              selected={selectedDate2}
              onChange={handleDateChange2}
              open={calendarOpen2}
              onClickOutside={closeCalendar2}
              locale={es}
              dateFormat="yyyy"
              showYearPicker
              onInputClick={openCalendar2} // Añade este manejador para abrir el calendario en clic de entrada
            />
            <CalendarTodayIcon
              onClick={openCalendar2}
              style={{ cursor: "pointer", marginLeft: "8px" }}
            />
          </div>
          <ChartCliente dataGraficaActual={dataGraficaActual} dataGraficaAnterior={dataGraficaAnterior} />
        </div>
        <div style={{ flex: 1}}>
          <TableCliente
            dataDocumentos = {dataDocumentos}
            promedioCompra = {promedioCompra}
            promedioItems = {promedioItems}
            promedioComprasAlMes = {promedioComprasAlMes}
          />
        </div>
      </Container>
    </React.Fragment>    
  );
}
