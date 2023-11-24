import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Avatar, DialogContent, IconButton, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string | React.ReactNode;
  onClose: () => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction='left' ref={ref} {...props} />;
});

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog maxWidth='lg' TransitionComponent={Transition} onClose={handleClose} open={open}>
      <DialogTitle>Riddle</DialogTitle>
      <IconButton
        aria-label='close'
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        className='flex justify-evenly width-[100%] height-[100%] min-w-[260px] min-h-[150px]'
      >
        <Avatar src='https://scontent.xx.fbcdn.net/v/t1.15752-9/364653851_671841787745238_3965407705454715325_n.jpg?stp=dst-jpg_p206x206&_nc_cat=109&ccb=1-7&_nc_sid=510075&_nc_ohc=h2gOCpwvs1QAX-5Ojqc&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdSOFEFSgTLLk0P45Pc-BbC0OtlPDFI1Fk45dN-qXwM0mQ&oe=657BA2BA' />
        {selectedValue}
        <Avatar src='https://scontent.xx.fbcdn.net/v/t1.15752-9/364653851_671841787745238_3965407705454715325_n.jpg?stp=dst-jpg_p206x206&_nc_cat=109&ccb=1-7&_nc_sid=510075&_nc_ohc=h2gOCpwvs1QAX-5Ojqc&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdSOFEFSgTLLk0P45Pc-BbC0OtlPDFI1Fk45dN-qXwM0mQ&oe=657BA2BA' />
      </DialogContent>
    </Dialog>
  );
}

export default SimpleDialog;
