import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Box, Alert } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import UrlForm from '../components/UrlForm';
import UrlResultDisplay from '../components/UrlResultDisplay';
import { log } from '../api/logger';
import { getUrls, saveUrls, shortcodeExists } from '../utils/storage';
import { generateShortcode, isValidUrl } from '../utils/helpers';

const MAX_URLS = 5;

const ShortenerPage = () => {
  const [entries, setEntries] = useState([{ longUrl: '', customShortcode: '', validity: '' }]);
  const [results, setResults] = useState([]);
  const [errors, setErrors] = useState([]);
  const [globalError, setGlobalError] = useState('');

  useEffect(() => {
    log('info', 'page', 'Shortener page loaded.');
  }, []);
  
  const updateEntry = (index, field, value) => {
    const newEntries = [...entries];
    newEntries[index][field] = value;
    setEntries(newEntries);
  };

  const addEntry = () => {
    if (entries.length < MAX_URLS) {
      setEntries([...entries, { longUrl: '', customShortcode: '', validity: '' }]);
    }
  };

  const removeEntry = (index) => {
    if (entries.length > 1) {
      const newEntries = entries.filter((_, i) => i !== index);
      setEntries(newEntries);
    }
  };

  const validateInputs = () => {
    const newErrors = [];
    let isValid = true;
    setGlobalError('');

    entries.forEach((entry, index) => {
      const entryErrors = {};
      if (!isValidUrl(entry.longUrl)) {
        entryErrors.longUrl = 'Please enter a valid URL.';
        isValid = false;
        log('warn', 'page', `Invalid URL format provided: ${entry.longUrl}`);
      }
      if (entry.customShortcode && !/^[a-zA-Z0-9_-]+$/.test(entry.customShortcode)) {
        entryErrors.customShortcode = 'Alphanumeric characters only.';
        isValid = false;
      }
      if (entry.customShortcode && shortcodeExists(entry.customShortcode)) {
         entryErrors.customShortcode = 'This shortcode is already taken.';
         isValid = false;
         log('error', 'page', `Custom shortcode ${entry.customShortcode} already exists.`);
      }
      if (entry.validity && (!Number.isInteger(Number(entry.validity)) || Number(entry.validity) <= 0)) {
        entryErrors.validity = 'Must be a positive number.';
        isValid = false;
      }
      newErrors[index] = entryErrors;
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateInputs()) {
      setGlobalError('Please fix the errors before submitting.');
      return;
    }
    
    const allUrls = getUrls();
    const newResults = [];

    entries.forEach(entry => {
        const shortcode = entry.customShortcode || generateShortcode();
        const validityInMinutes = entry.validity ? parseInt(entry.validity, 10) : 30;
        const now = new Date();
        const expiresAt = new Date(now.getTime() + validityInMinutes * 60 * 1000);

        const newUrl = {
            longUrl: entry.longUrl,
            shortcode,
            shortUrl: `${window.location.origin}/${shortcode}`,
            createdAt: now.toISOString(),
            expiresAt: expiresAt.toISOString(),
            clicks: 0,
            clickDetails: [],
        };

        allUrls.push(newUrl);
        newResults.push(newUrl);
        log('info', 'page', `Successfully created short URL for ${entry.longUrl}`);
    });

    saveUrls(allUrls);
    setResults(newResults);
    setEntries([{ longUrl: '', customShortcode: '', validity: '' }]); // Reset form
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Create Short URLs
      </Typography>
      <form onSubmit={handleSubmit}>
        {globalError && <Alert severity="error" sx={{ mb: 2 }}>{globalError}</Alert>}
        {entries.map((entry, index) => (
          <UrlForm
            key={index}
            index={index}
            entry={entry}
            updateEntry={updateEntry}
            removeEntry={removeEntry}
            error={errors[index]}
          />
        ))}
         <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button
                variant="outlined"
                onClick={addEntry}
                disabled={entries.length >= MAX_URLS}
                startIcon={<AddCircleOutlineIcon />}
            >
                Add another URL
            </Button>
            <Button type="submit" variant="contained" color="primary" size="large">
                Shorten
            </Button>
        </Box>
      </form>
      <UrlResultDisplay results={results} />
    </Container>
  );
};

export default ShortenerPage;