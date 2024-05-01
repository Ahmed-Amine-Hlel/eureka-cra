import React, {
  useState,
  useRef,
  MouseEvent as ReactMouseEvent,
  TouchEvent as ReactTouchEvent,
} from 'react';
import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface SplitButtonProps {
  buttonLabel: string;
  options: string[];
  isSplit?: boolean;
  onSelect: (selectedOption: string) => void;
  isSelected?: boolean;
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
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleMenuItemClick = (
    _event: ReactMouseEvent<HTMLLIElement>,
    index: number
  ) => {
    setSelectedIndex(index);
    setOpen(false);
    onSelect(`${buttonLabel}:${options[index]}`);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (
    event:
      | MouseEvent
      | TouchEvent
      | ReactMouseEvent<Element, MouseEvent>
      | ReactTouchEvent<Element>
  ) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setOpen(false);
  };

  const handleMainButtonClick = () => {
    if (options.length === 0) {
      onSelect(buttonLabel);
    } else if (selectedIndex != null) {
      onSelect(options[selectedIndex]);
    }
  };

  return (
    <>
      <ButtonGroup variant="outlined" ref={anchorRef} aria-label="split button">
        <Button
          onClick={handleMainButtonClick}
          style={{
            flexGrow: '1',
            color: '#F1F2F6',
            borderColor: 'transparent',
            backgroundColor: isSelected ? '#344955' : '#289D73',
            borderRadius: isSplit ? '20px 0 0 20px' : '20px',
            padding: '0.5rem 1.5rem',
          }}
        >
          {options.length > 0 && selectedIndex != null
            ? options[selectedIndex]
            : buttonLabel}
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
                            selected={index === selectedIndex}
                            onClick={(event) =>
                              handleMenuItemClick(
                                event as ReactMouseEvent<HTMLLIElement>,
                                index
                              )
                            }
                          >
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
    </>
  );
};

export default SplitButton;
