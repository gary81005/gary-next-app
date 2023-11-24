import { Card, CardContent, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  title: string;
  children: ReactNode;
}

const DisplayCard = ({ children, title }: Props) => {
  return (
    <Card className='mb-2'>
      <CardContent className='flex flex-col'>
        <Typography variant='h6'>{title}</Typography>
        {children}
      </CardContent>
    </Card>
  );
};

export default DisplayCard;
