import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";   // ✅ import the plugin

const generatePDF = (data, headers, filename) => {
  const doc = new jsPDF();
  
  // ... your header logic ...
  
  // Replace doc.autoTable with autoTable(doc, options)
  autoTable(doc, {
    head: [headers.map(h => h.key)],  // adjust to your column structure
    body: data.map(row => headers.map(h => row[h.display])),
    startY: 40,
    // ... other options
  });
  
  doc.save(filename);
};

export default generatePDF;