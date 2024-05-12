import React, { useState, useRef } from 'react';
import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Checkbox,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface SplitButtonProps {
  buttonLabel: string;
  options: string[];
  isSplit?: boolean;
  onSelect: (selectedOptions: string[] | null) => void;
  isSelected: boolean;
}

const SplitButton: React.FC<SplitButtonProps> = ({
  buttonLabel,
  options = [],
  isSplit = false,
  onSelect,
  isSelected,
}) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

  const handleMenuItemClick = (index: number) => {
    const currentIndex = selectedIndices.indexOf(index);
    const newSelectedIndices = [...selectedIndices];

    if (currentIndex === -1) {
      newSelectedIndices.push(index);
    } else {
      newSelectedIndices.splice(currentIndex, 1);
    }

    setSelectedIndices(newSelectedIndices);
    onSelect(newSelectedIndices.map((i) => options[i]));
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setOpen(false);
  };

  const handleMainButtonClick = () => {
    if (isSplit) {
      if (selectedIndices.length > 0) {
        if (!isSelected) {
          onSelect(selectedIndices.map((i) => options[i]));
        } else {
          onSelect(null);
        }
      }
    } else {
      onSelect(isSelected ? null : []);
    }
  };

  return (
    <ButtonGroup variant="outlined" ref={anchorRef} aria-label="split button">
      <Button
        onClick={handleMainButtonClick}
        style={{
          flexGrow: 1,
          color: '#F1F2F6',
          borderColor: 'transparent',
          backgroundColor: isSelected ? '#344955' : '#289D73',
          borderRadius: isSplit ? '20px 0 0 20px' : '20px',
          padding: '0.5rem 1.5rem',
        }}
      >
        {buttonLabel}
      </Button>
      {isSplit && options.length > 0 && (
        <>
          <Button
            size="small"
            aria-controls={open ? 'split-button-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
            style={{
              color: '#F1F2F6',
              borderColor: 'transparent',
              backgroundColor: isSelected ? '#344955' : '#289D73',
              borderRadius: '0 20px 20px 0',
            }}
          >
            <ArrowDropDownIcon />
          </Button>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom' ? 'center top' : 'center bottom',
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList id="split-button-menu">
                      {options.map((option, index) => (
                        <MenuItem
                          key={option}
                          onClick={() => handleMenuItemClick(index)}
                        >
                          <Checkbox checked={selectedIndices.includes(index)} />
                          {option}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </>
      )}
    </ButtonGroup>
  );
};

export default SplitButton;
