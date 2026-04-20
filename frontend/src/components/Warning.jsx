import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box
} from "@mui/material";

import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const ConfirmDelete = ({ open, onClose, onConfirm }) => {
  return (
<Dialog
  open={open}
  onClose={onClose}
  PaperProps={{
    sx: {
      borderRadius: 3,
      padding: 2,
      minWidth: 700
    }
  }}
>
  <DialogContent>
    <Box sx={{alignItems:"center",display:"flex",justifyContent:"center",flexDirection:"column",gap:2}} >
      

      <WarningAmberIcon sx={{ fontSize: 50, color: "#f57c00" }}/>

      <Typography variant="h6" fontWeight="bold">
        Are You Sure ?
      </Typography>

      <Typography variant="body2" color="text.secondary" textAlign="center">
        This action cannot be undone.
      </Typography>
    </Box>
  </DialogContent>

  <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
    <Button
      onClick={onClose}
      variant="outlined"
      sx={{ borderRadius: 2, px: 3 }}
    >
      Cancel
    </Button>

    <Button
      onClick={onConfirm}
      variant="contained"
      color="error"
      sx={{ borderRadius: 2, px: 3 }}
    >
      Delete
    </Button>
  </DialogActions>
</Dialog>
  );
};

export default ConfirmDelete;