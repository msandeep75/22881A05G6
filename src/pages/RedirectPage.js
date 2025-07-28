import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUrlByShortcode, getUrls, saveUrls } from '../utils/storage';
import { log } from '../api/logger';
import { Container, Typography, CircularProgress, Box } from '@mui/material';

const RedirectPage = () => {
  const { shortcode } = useParams();
  const [message, setMessage] = useState('Redirecting...');
  const [error, setError] = useState(false);

  useEffect(() => {
    const urlEntry = getUrlByShortcode(shortcode);

    if (urlEntry) {
      const now = new Date();
      const expiry = new Date(urlEntry.expiresAt);

      if (now > expiry) {
        setMessage('This link has expired.');
        setError(true);
        log('warn', 'page', `Attempted to access expired link: ${shortcode}`);
      } else {
        // Update click stats
        urlEntry.clicks += 1;
        urlEntry.clickDetails.push({
          timestamp: now.toISOString(),
          referrer: document.referrer,
          location: 'India', // Coarse-grained location as requested
        });

        const allUrls = getUrls();
        const index = allUrls.findIndex(u => u.shortcode === shortcode);
        if (index !== -1) {
            allUrls[index] = urlEntry;
            saveUrls(allUrls);
        }
        
        log('info', 'page', `Redirecting shortcode ${shortcode} to ${urlEntry.longUrl}`);
        window.location.href = urlEntry.longUrl;
      }
    } else {
      setMessage('URL not found. Please check the link and try again.');
      setError(true);
      log('error', 'page', `Shortcode not found: ${shortcode}`);
    }
  }, [shortcode]);

  return (
    <Container sx={{ textAlign: 'center', mt: 10 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mb: 3 }}>
             {!error && <CircularProgress />}
            <Typography variant="h5">{message}</Typography>
        </Box>
    </Container>
  );
};

export default RedirectPage;