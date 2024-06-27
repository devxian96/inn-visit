import type { FC } from 'react';
import { LinearProgress, Box, Typography } from '@mui/material';

const style = {
    wrapper: {
        display: 'flex',
        alignItems: 'center',
    },
    progress: {
        width: '100%',
        mr: 1,
    },
    text: {
        minWidth: 35,
    },
};

interface Props {
    value: number;
}

export const LinearProgressWithLabel: FC<Props> = ({ value }) => {
    return (
        <Box sx={style.wrapper}>
            <Box sx={style.progress}>
                <LinearProgress variant="determinate" value={value} />
            </Box>
            <Box sx={style.text}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(value)}%`}</Typography>
            </Box>
        </Box>
    );
};
