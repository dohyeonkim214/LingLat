// SurveyForm.js
import React from 'react';
import { TextField, Button, Box } from '@mui/material';

function SurveyForm() {
  return (
    <Box sx={{ mt: 4 }}>
      <TextField label="Name" variant="outlined" fullWidth sx={{ mb: 2 }} />
      <TextField label="Age" variant="outlined" fullWidth sx={{ mb: 2 }} />
      <TextField label="Preferred Learning Style" variant="outlined" fullWidth sx={{ mb: 2 }} />
      <Button variant="contained" color="primary">Submit Survey</Button>
    </Box>
  );
}

export default SurveyForm;
