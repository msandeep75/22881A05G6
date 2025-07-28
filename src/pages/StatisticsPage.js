import React, { useState, useEffect } from 'react';
import { getUrls } from '../utils/storage';
import { log } from '../api/logger';
import {
  Container, Typography, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Accordion, AccordionSummary, AccordionDetails, Link
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link as RouterLink } from 'react-router-dom';

const StatisticsPage = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    log('info', 'page', 'Statistics page loaded.');
    const storedUrls = getUrls();
    setUrls(storedUrls);
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        URL Statistics
      </Typography>
      {urls.length === 0 ? (
        <Typography>No URLs have been shortened yet.</Typography>
      ) : (
        urls.map((url, index) => (
          <Accordion key={index} sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ width: '40%', flexShrink: 0 }}>
                <Link component={RouterLink} to={`/${url.shortcode}`} target="_blank">{url.shortUrl}</Link>
              </Typography>
              <Typography sx={{ color: 'text.secondary', width: '40%' }} noWrap>
                {url.longUrl}
              </Typography>
              <Typography sx={{ color: 'text.secondary', ml: 'auto' }}>
                Clicks: {url.clicks}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Paper>
                <TableContainer>
                  <Table size="small">
                    <TableBody>
                        <TableRow>
                            <TableCell component="th" scope="row">Created At</TableCell>
                            <TableCell>{new Date(url.createdAt).toLocaleString()}</TableCell>
                        </TableRow>
                         <TableRow>
                            <TableCell component="th" scope="row">Expires At</TableCell>
                            <TableCell>{new Date(url.expiresAt).toLocaleString()}</TableCell>
                        </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                
                {url.clickDetails.length > 0 && (
                    <>
                        <Typography variant="h6" sx={{p: 2}}>Click Details</Typography>
                        <TableContainer>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Timestamp</TableCell>
                                        <TableCell>Referrer</TableCell>
                                        <TableCell>Location</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {url.clickDetails.map((click, i) => (
                                        <TableRow key={i}>
                                            <TableCell>{new Date(click.timestamp).toLocaleString()}</TableCell>
                                            <TableCell>{click.referrer || 'Direct'}</TableCell>
                                            <TableCell>{click.location}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                )}
              </Paper>
            </AccordionDetails>
          </Accordion>
        ))
      )}
    </Container>
  );
};

export default StatisticsPage;