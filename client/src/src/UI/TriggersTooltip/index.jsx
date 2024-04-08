import { ClickAwayListener, Tooltip } from "@mui/material";
import { useState } from "react";

import "./styles.css";
function TriggerTooltip({ children, title }) {
  const [open, setOpen] = useState(false);
  const handleTooltipClose = () => {
    setOpen(false);
  };
  const handleTooltipClick = () => {
    setOpen((pre) => !pre);
  };

  return (
    <div>
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <div>
          <Tooltip
            id="trigger-tooltip"
            sx={{
              backgroundColor: "white",
              color: "black",
            }}
            PopperProps={{
              disablePortal: true,
            }}
            onClose={handleTooltipClose}
            open={open}
            onClick={handleTooltipClose}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={title}
          >
            <button type="button" onClick={handleTooltipClick}>
              {children}
            </button>
          </Tooltip>
        </div>
      </ClickAwayListener>
    </div>
  );
}

export default TriggerTooltip;
