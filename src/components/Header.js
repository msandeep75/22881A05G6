import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          URL Shortener
        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} to="/">
            Shorten URL
          </Button>
          <Button color="inherit" component={RouterLink} to="/stats">
            Statistics
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;