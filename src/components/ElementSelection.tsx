import React, { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

type MainElement = 'everything' | 'dataCollection' | 'document' | 'modelOnly';
type SubElement =
  | 'dataCollection1'
  | 'dataCollection2'
  | 'dataCollection3'
  | 'document1'
  | 'document2'
  | 'document3';

const ElementSelection = () => {
  const [selectedElement, setSelectedElement] = useState<MainElement | null>(
    null
  );
  const [subElement, setSubElement] = useState<SubElement | null>(null);

  const handleElementChange = (
    _event: React.MouseEvent<HTMLElement>,
    newElement: MainElement | null
  ) => {
    setSelectedElement(newElement);
    setSubElement(null);
  };

  const handleSubElementChange = (
    _event: React.MouseEvent<HTMLElement>,
    newSubElement: SubElement | null
  ) => {
    setSubElement(newSubElement);
  };
  return (
    <div>
      <ToggleButtonGroup
        color="primary"
        value={selectedElement}
        exclusive
        onChange={handleElementChange}
        aria-label="element selection"
      >
        <ToggleButton value="everything">Everything</ToggleButton>
        <ToggleButton value="dataCollection">Data Collection</ToggleButton>
        <ToggleButton value="document">Document</ToggleButton>
        <ToggleButton value="modelOnly">Model Only</ToggleButton>
      </ToggleButtonGroup>
      {(selectedElement === 'dataCollection' ||
        selectedElement === 'document') && (
        <ToggleButtonGroup
          color="secondary"
          value={subElement}
          exclusive
          onChange={handleSubElementChange}
          aria-label="sub-element selection"
          style={{ marginTop: '10px' }}
        >
          {selectedElement === 'dataCollection' && (
            <>
              <ToggleButton value="dataCollection1">
                Data Collection 1
              </ToggleButton>
              <ToggleButton value="dataCollection2">
                Data Collection 2
              </ToggleButton>
              <ToggleButton value="dataCollection3">
                Data Collection 3
              </ToggleButton>
            </>
          )}
          {selectedElement === 'document' && (
            <>
              <ToggleButton value="document1">Document 1</ToggleButton>
              <ToggleButton value="document2">Document 2</ToggleButton>
              <ToggleButton value="document3">Document 3</ToggleButton>
            </>
          )}
        </ToggleButtonGroup>
      )}
    </div>
  );
};

export default ElementSelection;
