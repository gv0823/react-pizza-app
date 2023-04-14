import { FC } from 'react';
import { Stack, Typography } from "@mui/material";


const NotFoundView = () => {
    return (
        <div className="center">
            <Stack alignContent="center" alignItems="center" spacing={4}>
                <Typography variant='h3' component='div'>
                    404 Not Found
                </Typography>
            </Stack>
        </div>
    );
}

export default NotFoundView;