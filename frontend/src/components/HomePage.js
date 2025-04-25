import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  Grid,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Stack,
  Avatar,
  Button,
  IconButton
} from '@mui/material';
import endpoints from '../config/endpoints';
import { useLanguage } from '../context/LanguageContext';
import LanguageIcon from '@mui/icons-material/Language';

function HomePage() {
  const { language, translations, toggleLanguage } = useLanguage();
  const t = translations[language];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Language Selector */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <IconButton onClick={toggleLanguage} color="primary">
          <LanguageIcon />
        </IconButton>
      </Box>

      {/* Greeting Section */}
      <Paper elevation={3} sx={{ p: 3, mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t.welcome.title}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {t.welcome.description}
        </Typography>
      </Paper>

      {/* Guidelines Section */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          {t.guidelines.title}
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary={t.guidelines.steps.selectModel.title}
              secondary={t.guidelines.steps.selectModel.description}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText 
              primary={t.guidelines.steps.startDialogue.title}
              secondary={t.guidelines.steps.startDialogue.description}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText 
              primary={t.guidelines.steps.interact.title}
              secondary={t.guidelines.steps.interact.description}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText 
              primary={t.guidelines.steps.learn.title}
              secondary={t.guidelines.steps.learn.description}
            />
          </ListItem>
        </List>
      </Paper>

      {/* Models Grid */}
      <Typography variant="h5" component="h2" gutterBottom>
        {t.models.title}
      </Typography>
      <Grid container spacing={3}>
        {endpoints.frontend.map((endpoint) => (
          <Grid item xs={12} md={6} key={endpoint.path}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  {endpoint.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {endpoint.description}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Link 
                    to={endpoint.path}
                    style={{ 
                      color: '#1976d2',
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    {t.models.startDialogue}
                  </Link>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Footer */}
      <Paper elevation={3} sx={{ mt: 6, p: 3 }}>
        <Grid container spacing={4}>
          {/* ICWR Section */}
          <Grid item xs={12} md={6}>
            <Stack direction="row" spacing={2} alignItems="center" mb={2}>
              <Box
                component="img"
                src="/logos/icwr-logo.png"
                alt="ICWR Logo"
                sx={{ width: 60, height: 60, objectFit: 'contain' }}
              />
              <Box>
                <Typography variant="h6" component="h3">
                  {t.footer.icwr.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {t.footer.icwr.subtitle}
                </Typography>
              </Box>
            </Stack>
            <Typography variant="body2" paragraph>
              {t.footer.icwr.university}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t.footer.icwr.address}
            </Typography>
          </Grid>

          {/* TELAB Section */}
          <Grid item xs={12} md={6}>
            <Stack direction="row" spacing={2} alignItems="center" mb={2}>
              <Box
                component="img"
                src="/logos/telab-logo.png"
                alt="TELAB Logo"
                sx={{ width: 60, height: 60, objectFit: 'contain' }}
              />
              <Box>
                <Typography variant="h6" component="h3">
                  {t.footer.telab.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {t.footer.telab.subtitle}
                </Typography>
              </Box>
            </Stack>
            <Typography variant="body2" paragraph>
              {t.footer.telab.university}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t.footer.telab.address}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default HomePage; 