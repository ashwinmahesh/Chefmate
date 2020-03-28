import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({}));

type Props = {
  open: Boolean,
  handleClose: () => void,
};
export default function NotImplemented(props: Props) {
  const styles = useStyles();
  return (
    <Dialog open={props.open}>
      <DialogTitle>Feature Not Yet Implemented</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This feature is not yet implemented, however it will be available soon!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Acknowledge</Button>
      </DialogActions>
    </Dialog>
  );
}
