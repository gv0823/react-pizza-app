import { FC } from 'react';
import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/hooks";
import { ServiceMethod, setServiceMethod } from "../slices/pizzaSlice";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


interface ConfirmationViewProps {
    isSuccess?: boolean;
}

const ConfirmationView: FC<ConfirmationViewProps> = (props: ConfirmationViewProps) => {

    return (
        <Stack alignItems="center" spacing={3}>
            <CheckCircleIcon color="success" sx={{ fontSize: 56 }} />
            <Typography variant='h4' component='div'>
                Thank you for your order.
            </Typography>
            <p style={{fontSize:"20px"}}>Web page redirects after 3 seconds.</p>
        </Stack>
    );
}

export default ConfirmationView;