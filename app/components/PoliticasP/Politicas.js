/**
 * @fileoverview Objeto JavaScript que contiene la Política de Privacidad
 * de MEDXPRO SC, estructurada para su fácil integración en aplicaciones web o móviles.
 */

export const POLITICA_PRIVACIDAD_MEDXPRO = {
    titulo: "Política de Privacidad de MEDXPRO",
    // Se recomienda actualizar esta fecha:
    version: "Vigente al 28 de febrero de 2026", 
    secciones: [
        {
            numero: 1,
            titulo: "Responsable del Tratamiento",
            contenido: "MEDXPRO SC, empresa dedicada a servicios de educación médica en diagnóstico neuromuscular, es responsable del tratamiento de los datos personales recabados a través de la aplicación MEDXPRO.",
            contacto: {
                correo: ["medxproapp@gmail.com", "contacto@medxproapp.com"],
                telefono: "+52 664 385 2789"
            }
        },
        {
            numero: 2,
            titulo: "Información que Recopilamos",
            descripcion: "La aplicación puede recolectar la siguiente información:",
            datosRecopilados: [
                "Datos de identificación (nombre, correo, teléfono).",
                "Datos médicos y clínicos (resultados neurofisiológicos, ultrasonido musculoesquelético y esquemas anatómicos).",
                "Datos de uso de la app (comportamiento dentro de la app, preferencias de navegación).",
                "Datos técnicos del dispositivo (modelo, sistema operativo, dirección IP)."
            ]
        },
        {
            numero: 3,
            titulo: "Finalidad del Tratamiento",
            descripcion: "Los datos se utilizan para:",
            finalidades: [
                "Servicios de diagnóstico asistido y educación médica.",
                "Generación y exportación de esquemas anatómicos.",
                "Personalización de la experiencia.",
                "Cumplimiento legal.",
                "Seguridad y mejora de servicios."
            ]
        },
        {
            numero: 4,
            titulo: "Uso y Compartición de Datos",
            contenido: "No compartimos, vendemos, ni alquilamos datos personales. La información solo podrá compartirse con autoridades competentes bajo requerimiento legal y proveedores tecnológicos que cumplan con normas de seguridad. Esto de conformidad con los artículos 6, 8, 15 y 16 de la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP)."
        },
        {
            numero: 5,
            titulo: "Consentimiento",
            contenido: "El consentimiento para el tratamiento de datos se considera otorgado de forma expresa al aceptar los términos y condiciones de uso de la aplicación, así como al continuar con el registro y utilización de los servicios ofrecidos."
        },
        {
            numero: 6,
            titulo: "Uso y Compartición de Datos (Detalle)",
            descripcion: "MEDXPRO SC no vende, alquila ni comercializa datos personales. La información solo podrá compartirse con:",
            comparticion: [
                "Autoridades competentes, bajo requerimiento legal.",
                "Proveedores tecnológicos que cumplan con estándares de seguridad y confidencialidad equivalentes a los exigidos por MEDXPRO SC."
            ]
        },
        {
            numero: 7,
            titulo: "Conservación y Seguridad",
            contenido: "Los datos se almacenan en servidores seguros con cifrado. Se implementan medidas técnicas y administrativas para evitar accesos no autorizados, pérdida, alteración o divulgación indebida. Los datos serán conservados hasta que el usuario solicite su cancelación conforme a los derechos ARCO."
        },
        {
            numero: 8,
            titulo: "Derechos del Usuario (ARCO)",
            descripcion: "El usuario puede ejercer los derechos ARCO (Acceso, Rectificación, Cancelación y Oposición) enviando una solicitud a contacto@medxproapp.com.",
            requisitosSolicitud: [
                "Nombre completo.",
                "Identificación oficial.",
                "Descripción clara del derecho que desea ejercer."
            ],
            plazoRespuesta: "Previo a una revisión detallada del contrato de acceso y selección del tipo de contenido, se emitirá una respuesta en un plazo máximo de 20 días hábiles."
        },
        {
            numero: 9,
            titulo: "Menores de Edad",
            contenido: "La app no está dirigida a menores de 16 años. Si se detecta información de un menor sin consentimiento de sus padres o tutores, será eliminada de inmediato."
        },
        {
            numero: 10,
            titulo: "Transferencias Internacionales",
            contenido: "En caso de transferencia de datos a otros países, se garantizará el cumplimiento con las normas de privacidad aplicables."
        },
        {
            numero: 11,
            titulo: "Vulneración de Seguridad",
            contenido: "En caso de vulneración que comprometa los datos personales, MEDXPRO SC notificará al titular en un plazo no mayor a 72 horas, indicando la naturaleza del incidente, los datos comprometidos y las medidas correctivas adoptadas."
        },
        {
            numero: 12,
            titulo: "Modificaciones a la Política",
            contenido: "Esta Política puede actualizarse en cualquier momento. Los cambios se notificarán a través de la app o el sitio web oficial. La versión vigente estará disponible para consulta permanente."
        },
        {
            numero: 13,
            titulo: "Contacto para Dudas o Aclaraciones",
            contacto: {
                correo: ["medxproapp@gmail.com", "contacto@medxproapp.com"],
                telefono: "+52 664 385 2789"
            }
        }
    ]
};