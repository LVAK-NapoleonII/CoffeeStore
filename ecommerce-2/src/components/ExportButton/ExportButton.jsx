// ExportButton.js
import React from 'react';
import { Button } from '@mui/material';
import Papa from 'papaparse';

const ExportButton = ({ data }) => {
  const handleExport = () => {
    const csv = Papa.unparse(data, { header: true });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', 'data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button variant="contained" color="primary" onClick={handleExport} style={{marginTop:'15px', backgroundColor:'#d5b895'}}>
      Export to CSV
    </Button>
  );
};

export default ExportButton;
