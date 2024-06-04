import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/material';

interface SourceAccordionProps {
  sources: string[];
}

const SourceAccordion: React.FC<SourceAccordionProps> = ({ sources }) => {
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
          {sources.length > 0 ? (
            sources.map((source, index) => (
              <Typography key={index}>
                Source {index + 1}: {source}
              </Typography>
            ))
          ) : (
            <Typography>No sources available</Typography>
          )}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default SourceAccordion;
