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
import SurveyPage from './SurveyPage';
import SignUpPage from './SignUpPage';
import footer from './style/footer';

function MainPage() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <AppBar position="static" color="default">
          <Toolbar>
            {/* BookOpen 아이콘 제거 */}
            <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1 }}>
              LingLat
            </Typography>
            <Button color="inherit" href="/features">Features</Button>
            <Button color="inherit" href="/how-it-works">How It Works</Button>
            <Button color="inherit" href="/pricing">Pricing</Button>
            <Button variant="contained" color="primary" href="/sign-up">Sign Up</Button>
          </Toolbar>
        </AppBar>

        {/* Hero Section */}
        <Box sx={{ backgroundColor: 'primary.main', color: 'white', py: 10, textAlign: 'center' }}>
          <Container maxWidth="lg">
            <Typography variant="h3" component="h1" gutterBottom>
              Learn English Through Shakespeare
            </Typography>
            <Typography variant="h5" component="p" gutterBottom>
              Innovative language learning platform for 10th grade immigrants
            </Typography>
            <Button size="large" variant="contained" color="secondary" sx={{ mt: 4 }} href="/survey">
              Start Your Journey
            </Button>
          </Container>
        </Box>

        {/* Features Section */}
        <Container maxWidth="lg" sx={{ py: 10 }}>
          <Typography variant="h4" component="h2" textAlign="center" gutterBottom>
            Why Choose LingLat?
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {[
              { title: 'Scientific Learning', icon: null, description: 'Based on cognitive science and construction grammar' },
              { title: 'Interactive Experience', icon: null, description: 'Learn through interactive Shakespearean texts' },
              { title: 'Track Progress', icon: null, description: 'Monitor your language learning journey' },
            ].map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card>
                  <CardHeader title={<Box sx={{ display: 'flex', alignItems: 'center' }}>{feature.icon}<Typography variant="h6" sx={{ ml: 1 }}>{feature.title}</Typography></Box>} />
                  <CardContent>
                    <Typography>{feature.description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

 <footer />

        {/* Routes */}
        <Routes>
          <Route path="/survey" element={<SurveyPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default MainPage;
