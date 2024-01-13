import React, {  useState, useEffect, useRef } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CircleIcon from "@mui/icons-material/Circle";
import es from "date-fns/locale/es";
import TableCliente from "../components/TableCliente";
import ChartCliente from "../components/chartCliente";

export default function TipoA() {
    const [selectedDate1, setSelectedDate1] = useState(new Date());
    const [calendarOpen1, setCalendarOpen1] = useState(false);
    const datePickerRef = useRef(null);
  
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
      // ... (resto del código)
    };
  
    const openCalendar1 = () => {
      setCalendarOpen1(true);
    };
  
    const closeCalendar1 = () => {
      setCalendarOpen1(false);
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
            height: "59.9vh",
          }}
        >
          <div style={{ flex: 1.6 }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <CircleIcon style={{ marginRight: "2px", color: "rgb(12, 55, 100)" }} />
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
                style={{ cursor: "pointer", marginLeft: "8px" }}
              />
            </div>
            <ChartCliente />
          </div>
          <div style={{ flex: 1 }}>
          </div>
        </Container>
      </React.Fragment>
    );
  }