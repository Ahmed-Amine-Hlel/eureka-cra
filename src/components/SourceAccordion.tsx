import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/material';

const SourceAccordion = () => {
  return (
    <Box style={{ paddingLeft: '10px' }}>
      <Accordion style={{ margin: '8px 0', backgroundColor: '#F1F2F6' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>View Sources</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ backgroundColor: '#F1F2F6' }}>
          <Typography>Source 1: Description of Source 1</Typography>
          <Typography>Source 2: Description of Source 2</Typography>
          <Typography>Source 3: Description of Source 3</Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default SourceAccordion;
