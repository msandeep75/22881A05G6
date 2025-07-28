import React from 'react';
import { Box, Typography, Link, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const UrlResultDisplay = ({ results }) => {
  if (results.length === 0) {
    return null;
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Shortened URLs
      </Typography>
      <List>
        {results.map((result, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <ListItemText
                primary={
                  <Typography variant="body1" noWrap sx={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    Original: {result.longUrl}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="text.primary">
                      Short URL:{' '}
                      <Link component={RouterLink} to={`/${result.shortcode}`} target="_blank" rel="noopener">
                        {result.shortUrl}
                      </Link>
                       {' ('}<Link href="#" onClick={() => copyToClipboard(result.shortUrl)} sx={{ cursor: 'pointer' }}>copy</Link>{')'}
                    </Typography>
                    <br />
                    <Typography component="span" variant="body2" color="text.secondary">
                      Expires At: {new Date(result.expiresAt).toLocaleString()}
                    </Typography>
                  </>
                }
              />
            </ListItem>
            {index < results.length - 1 && <Divider component="li" />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default UrlResultDisplay;