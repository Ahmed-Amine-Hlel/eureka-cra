import React from 'react';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Box,
} from '@mui/material';

const SourceSelect = () => {
  const [source, setSource] = React.useState<string>('');

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSource(event.target.value);
  };

  return (
    <Box style={{ paddingLeft: '10px' }}>
      <FormControl
        variant="outlined"
        size="small"
        style={{
          width: '100%',
          margin: '8px 0',
          alignSelf: 'center',
        }}
      >
        <InputLabel id="source-select-label">View Sources</InputLabel>
        <Select
          labelId="source-select-label"
          id="source-select"
          value={source}
          onChange={handleChange}
          label="View sources"
        >
          <MenuItem value="source1">Source 1</MenuItem>
          <MenuItem value="source2">Source 2</MenuItem>
          <MenuItem value="source3">Source 3</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SourceSelect;
