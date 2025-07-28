import React from 'react';
import { TextField, Grid, IconButton, Tooltip } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const UrlForm = ({ index, entry, updateEntry, removeEntry, error }) => {
  return (
    <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
      <Grid item xs={12} sm={5}>
        <TextField
          label="Long URL"
          variant="outlined"
          fullWidth
          value={entry.longUrl}
          onChange={(e) => updateEntry(index, 'longUrl', e.target.value)}
          error={!!error?.longUrl}
          helperText={error?.longUrl}
          required
        />
      </Grid>
      <Grid item xs={5} sm={3}>
        <TextField
          label="Custom Shortcode (Optional)"
          variant="outlined"
          fullWidth
          value={entry.customShortcode}
          onChange={(e) => updateEntry(index, 'customShortcode', e.target.value)}
          error={!!error?.customShortcode}
          helperText={error?.customShortcode}
        />
      </Grid>
      <Grid item xs={5} sm={3}>
        <TextField
          label="Validity (mins, Optional)"
          type="number"
          variant="outlined"
          fullWidth
          value={entry.validity}
          onChange={(e) => updateEntry(index, 'validity', e.target.value)}
           error={!!error?.validity}
           helperText={error?.validity}
        />
      </Grid>
      <Grid item xs={2} sm={1}>
        <Tooltip title="Remove URL">
          <IconButton onClick={() => removeEntry(index)} color="error">
            <RemoveCircleOutlineIcon />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
};

export default UrlForm;