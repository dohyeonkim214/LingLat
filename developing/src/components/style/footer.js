import React from 'react';
// import { BookOpen, CheckCircle, Users } from 'lucide-react';
// Lucide icons replaced due to module not found issue
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Box,
} from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SurveyPage from '../SurveyPage';
import SignUpPage from '../SignUpPage';
import footer from './footer';
      
      {/* Footer */}
       <Box sx={{ backgroundColor: 'grey.900', color: 'white', py: 6 }}>
       <Container maxWidth="lg">
         <Grid container spacing={4}>
           <Grid item xs={12} md={4}>
             <Typography variant="h6" gutterBottom>LingLat</Typography>
             <Typography>Transforming language education through literature</Typography>
           </Grid>
           <Grid item xs={12} md={4}>
             <Typography variant="h6" gutterBottom>Quick Links</Typography>
             <Box>
               <Button color="inherit" href="#">Home</Button>
               <Button color="inherit" href="#features">Features</Button>
               <Button color="inherit" href="#how-it-works">How It Works</Button>
               <Button color="inherit" href="#pricing">Pricing</Button>
             </Box>
           </Grid>
           <Grid item xs={12} md={4}>
             <Typography variant="h6" gutterBottom>Contact</Typography>
             <Typography>Email: contact@linglat.com</Typography>
             <Typography>Phone: (123) 456-7890</Typography>
           </Grid>
         </Grid>
         <Box textAlign="center" sx={{ mt: 4 }}>
           <Typography variant="body2">&copy; 2024 LingLat. All rights reserved.</Typography>
         </Box>
       </Container>
     </Box>