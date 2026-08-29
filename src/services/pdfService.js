import jsPDF from 'jspdf';

/**
 * Placeholder para futura generación de remito / comprobante de ingreso en PDF.
 * @param {Object} ingreso - Objeto con los datos de la orden de servicio
 */
export const generarRemitoPDF = (ingreso) => {
  try {
    const doc = new jsPDF();

    // Encabezado
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('ELECTRONICA PARSEC', 20, 20);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Servicio Técnico Especializado - Sistema de Gestión', 20, 26);
    doc.text('REMITO DE INGRESO / ORDEN DE SERVICIO', 20, 32);

    doc.line(20, 36, 190, 36);

    // Datos del comprobante
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(`N° Orden: ${ingreso.id || 'ING-XXXX'}`, 20, 46);
    doc.text(`Fecha: ${ingreso.fechaIngreso || new Date().toLocaleDateString('es-AR')}`, 130, 46);

    // Datos Cliente
    doc.setFont('helvetica', 'bold');
    doc.text('DATOS DEL CLIENTE', 20, 58);
    doc.setFont('helvetica', 'normal');
    doc.text(`Cliente: ${ingreso.clienteNombre || 'N/A'}`, 20, 66);

    // Datos Equipo
    doc.setFont('helvetica', 'bold');
    doc.text('DATOS DEL ARTEFACTO / EQUIPO', 20, 80);
    doc.setFont('helvetica', 'normal');
    doc.text(`Equipo: ${ingreso.equipo || 'N/A'}`, 20, 88);
    doc.text(`Marca: ${ingreso.marca || 'N/A'} - Modelo: ${ingreso.modelo || 'N/A'}`, 20, 95);
    doc.text(`N° Serie: ${ingreso.numeroSerie || 'N/A'}`, 20, 102);

    // Falla Reportada
    doc.setFont('helvetica', 'bold');
    doc.text('FALLA REPORTADA', 20, 114);
    doc.setFont('helvetica', 'normal');
    const fallaLines = doc.splitTextToSize(ingreso.fallaReportada || 'Sin detalle', 170);
    doc.text(fallaLines, 20, 122);

    // Observaciones y Estado
    const nextY = 122 + (fallaLines.length * 6) + 6;
    doc.setFont('helvetica', 'bold');
    doc.text(`Estado Actual: ${ingreso.estado || 'Pendiente'}`, 20, nextY);
    doc.text(`Presupuesto Estimado: $${ingreso.presupuesto ? ingreso.presupuesto.toLocaleString('es-AR') : '0'}`, 120, nextY);

    // Pie de página
    doc.setFontSize(9);
    doc.setFont('helvetica', 'italic');
    doc.text('Electrónica Parsec - Gracias por su confianza.', 20, 270);

    // Guardar el PDF
    doc.save(`Remito_${ingreso.id || 'Parsec'}.pdf`);
  } catch (error) {
    console.error('Error al generar el remito PDF:', error);
    alert('Error al generar el documento PDF. Consulta la consola para más detalles.');
  }
};
