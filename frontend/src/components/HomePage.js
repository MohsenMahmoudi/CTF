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
  Avatar
} from '@mui/material';
import endpoints from '../config/endpoints';

function HomePage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Greeting Section */}
      <Paper elevation={3} sx={{ p: 3, mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          به سیستم گفتگوی تفکر انتقادی خوش آمدید
        </Typography>
        <Typography variant="h6" color="text.secondary">
          این سیستم به شما کمک می‌کند تا مهارت‌های تفکر انتقادی خود را از طریق گفتگو با مدل‌های هوش مصنوعی بهبود بخشید.
        </Typography>
      </Paper>



      {/* Guidelines Section */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          راهنمای استفاده از سیستم
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="۱. انتخاب مدل مناسب"
              secondary="با توجه به نوع استدلال یا مهارت تفکری که می‌خواهید تمرین کنید، یکی از مدل‌های زیر را انتخاب کنید."
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText 
              primary="۲. شروع گفتگو"
              secondary="پس از انتخاب مدل، می‌توانید گفتگو را با طرح یک سؤال یا بیان یک استدلال آغاز کنید."
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText 
              primary="۳. تعامل با مدل"
              secondary="مدل به شما کمک می‌کند تا استدلال‌های خود را بهبود بخشید و نقاط ضعف آن‌ها را شناسایی کنید."
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText 
              primary="۴. یادگیری مستمر"
              secondary="از بازخوردهای مدل برای بهبود مهارت‌های تفکر انتقادی خود استفاده کنید."
            />
          </ListItem>
        </List>
      </Paper>

      {/* Models Grid */}
      <Typography variant="h5" component="h2" gutterBottom>
        مدل‌های موجود
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
                    شروع گفتگو →
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
                  کنفرانس بین‌المللی وب پژوهی
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  ICWR
                </Typography>
              </Box>
            </Stack>
            <Typography variant="body2" paragraph>
              دانشگاه علم و فرهنگ

            </Typography>
            <Typography variant="body2" color="text.secondary">
              آدرس: تهران – ابلوار اشرفي اصفهاني – نرسيده به پل اتوبان همت – خيابان شهيد قموشي – خيابان بهار -دانشگاه علم و فرهنگ
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
                  آزمایشگاه یادگیری الکترونیکی
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  TELAB
                </Typography>
              </Box>
            </Stack>
            <Typography variant="body2" paragraph>
              دانشگاه تهران
            </Typography>
            <Typography variant="body2" color="text.secondary">
              تهران، کارگر شمالی، پردیس دانشکدگان فنی دانشگاه تهران، ساختمان شماره یک دانشکده برق کامپیوتر
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default HomePage; 