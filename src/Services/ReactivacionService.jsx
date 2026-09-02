import axios from "axios";

// TODO: reemplazar por la URL real del backend cuando la API de Reactivación esté lista
const baseUrlReactivacion = () => {
  return "http://10.10.0.25:9696/api/Reactivacion";
};

// ============================================================
// MOCK DATA - Reemplazar las funciones de abajo por llamadas
// axios reales cuando el backend esté disponible. La forma de
// los datos ya está pensada para calzar con la respuesta real.
// ============================================================

const SEGMENTOS = {
  SUPER_VIP: "SUPER VIP",
  CLIENTE_PRINCIPAL: "CLIENTE PRINCIPAL",
  CHAMPIONS: "CHAMPIONS",
  POTENCIAL: "POTENCIAL",
  EN_RIESGO: "EN RIESGO",
};

const MOCK_CUENTAS_INACTIVAS = [
  {
    id: 1,
    codCliente: "CLI-001",
    razonSocial: "TRANSPORTES NORTE SAC",
    segmento: SEGMENTOS.SUPER_VIP,
    comprasUltimos3Meses: 1250,
    diasInactivo: 145,
    cantidadUltimasCompras: 3,
    contactado: false,
    fechaContacto: null,
    ultimasCompras: [
      { codigo: "20392751-DFG", descripcion: "TAPA COMBUST.C/LLAVE/CADENA (80MM) FH12/FM12/FH16 (1189577)(8152630)", cantidad: 16 },
      { codigo: "8127152-DFG", descripcion: "BOLSA AIRE POST B58 C/BASE TIPO 8 (365431)", cantidad: 14 },
      { codigo: "22223804-DFG", descripcion: "FILTRO SECADOR AIRE FMX-FH(21412848) 23260134 K09683750", cantidad: 13 },
    ],
  },
  {
    id: 2,
    codCliente: "CLI-002",
    razonSocial: "EMPRESA MINERA LOS ANDES",
    segmento: SEGMENTOS.CLIENTE_PRINCIPAL,
    comprasUltimos3Meses: 3400,
    diasInactivo: 92,
    cantidadUltimasCompras: 2,
    contactado: false,
    fechaContacto: null,
    ultimasCompras: [
      { codigo: "10234567-ABC", descripcion: "FILTRO DE ACEITE MOTOR SERIE 400", cantidad: 8 },
      { codigo: "10234568-ABC", descripcion: "FILTRO DE COMBUSTIBLE SERIE 400", cantidad: 6 },
    ],
  },
  {
    id: 3,
    codCliente: "CLI-003",
    razonSocial: "CONSTRUCTORA LIMA SA",
    segmento: SEGMENTOS.SUPER_VIP,
    comprasUltimos3Meses: 850,
    diasInactivo: 110,
    cantidadUltimasCompras: 2,
    contactado: false,
    fechaContacto: null,
    ultimasCompras: [
      { codigo: "30987654-XYZ", descripcion: "KIT DE FRENOS DELANTEROS", cantidad: 4 },
      { codigo: "30987655-XYZ", descripcion: "PASTILLAS DE FRENO TRASERAS", cantidad: 10 },
    ],
  },
  {
    id: 4,
    codCliente: "CLI-004",
    razonSocial: "GRUPO LOGÍSTICO DEL SUR",
    segmento: SEGMENTOS.CLIENTE_PRINCIPAL,
    comprasUltimos3Meses: 5120,
    diasInactivo: 185,
    cantidadUltimasCompras: 3,
    contactado: false,
    fechaContacto: null,
    ultimasCompras: [
      { codigo: "40112233-LMN", descripcion: "AMORTIGUADOR TRASERO IZQUIERDO", cantidad: 5 },
      { codigo: "40112234-LMN", descripcion: "AMORTIGUADOR TRASERO DERECHO", cantidad: 5 },
      { codigo: "40112235-LMN", descripcion: "RESORTE DE SUSPENSIÓN", cantidad: 3 },
    ],
  },
  {
    id: 5,
    codCliente: "CLI-005",
    razonSocial: "TRANSPORTE RÁPIDO EIRL",
    segmento: SEGMENTOS.CHAMPIONS,
    comprasUltimos3Meses: 7800,
    diasInactivo: 67,
    cantidadUltimasCompras: 2,
    contactado: false,
    fechaContacto: null,
    ultimasCompras: [
      { codigo: "50556677-OPQ", descripcion: "NEUMÁTICO 295/80R22.5", cantidad: 12 },
      { codigo: "50556678-OPQ", descripcion: "VÁLVULA DE AIRE PARA NEUMÁTICO", cantidad: 20 },
    ],
  },
  {
    id: 6,
    codCliente: "CLI-006",
    razonSocial: "INVERSIONES VIAL SA",
    segmento: SEGMENTOS.POTENCIAL,
    comprasUltimos3Meses: 420,
    diasInactivo: 200,
    cantidadUltimasCompras: 1,
    contactado: false,
    fechaContacto: null,
    ultimasCompras: [
      { codigo: "60778899-RST", descripcion: "BATERÍA 12V 150AH", cantidad: 2 },
    ],
  },
  {
    id: 7,
    codCliente: "CLI-007",
    razonSocial: "DISTRIBUIDORA CENTRAL PERÚ",
    segmento: SEGMENTOS.EN_RIESGO,
    comprasUltimos3Meses: 980,
    diasInactivo: 155,
    cantidadUltimasCompras: 2,
    contactado: false,
    fechaContacto: null,
    ultimasCompras: [
      { codigo: "70990011-UVW", descripcion: "CORREA DE DISTRIBUCIÓN", cantidad: 6 },
      { codigo: "70990012-UVW", descripcion: "TENSOR DE CORREA", cantidad: 6 },
    ],
  },
  {
    id: 8,
    codCliente: "CLI-008",
    razonSocial: "MINERA ANDINA CORPORACIÓN",
    segmento: SEGMENTOS.CHAMPIONS,
    comprasUltimos3Meses: 12400,
    diasInactivo: 78,
    cantidadUltimasCompras: 3,
    contactado: false,
    fechaContacto: null,
    ultimasCompras: [
      { codigo: "80001122-HIJ", descripcion: "MANGUERA HIDRÁULICA ALTA PRESIÓN", cantidad: 15 },
      { codigo: "80001123-HIJ", descripcion: "ACOPLE RÁPIDO HIDRÁULICO", cantidad: 20 },
      { codigo: "80001124-HIJ", descripcion: "ACEITE HIDRÁULICO ISO 68 (BALDE 5GL)", cantidad: 9 },
    ],
  },
];

const simularDelay = (data, ms = 500) =>
  new Promise((resolve) => setTimeout(() => resolve(data), ms));

/**
 * Obtiene la lista de cuentas inactivas, opcionalmente filtradas por
 * RUC o Razón Social.
 *
 * TODO: reemplazar por:
 *   return axios.get(`${baseUrlReactivacion()}/CuentasInactivas`, { params: { criterio } })
 *     .then((res) => res.data);
 */
export function getCuentasInactivas(criterio = "") {
  const criterioNormalizado = criterio.trim().toLowerCase();

  const resultado = !criterioNormalizado
    ? MOCK_CUENTAS_INACTIVAS
    : MOCK_CUENTAS_INACTIVAS.filter(
        (c) =>
          c.razonSocial.toLowerCase().includes(criterioNormalizado) ||
          c.codCliente.toLowerCase().includes(criterioNormalizado)
      );

  return simularDelay(resultado);
}

/**
 * Registra que se realizó la llamada de reactivación a un cliente.
 * Devuelve la fecha de contacto para reflejarla en la UI.
 *
 * TODO: reemplazar por:
 *   return axios.post(`${baseUrlReactivacion()}/RegistrarLlamada`, { codCliente })
 *     .then((res) => res.data);
 */
export function registrarLlamada(codCliente) {
  const fechaContacto = new Date().toLocaleDateString("es-PE");
  return simularDelay({ codCliente, contactado: true, fechaContacto }, 400);
}

export function getTotalCuentasInactivas() {
  return simularDelay(MOCK_CUENTAS_INACTIVAS.length, 0);
}
