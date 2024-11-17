import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import Box from "@mui/material/Box";
import { StyledButton, StyledOutlinedButton } from "../utils/CustomComponents";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface AlertDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteEventDialog: React.FC<AlertDialogProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={1}>
          <WarningAmberIcon color="warning" />
          Confirm Deletion
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are you sure you want to delete this event? This action cannot be
          undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <StyledOutlinedButton width="150px" onClick={onClose} color="primary">
          Cancel
        </StyledOutlinedButton>
        <StyledButton width="150px" onClick={onConfirm}>
          Delete
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteEventDialog;
