import type { FC } from 'react';
import { Stack, Input, Button } from '@mui/material';

export const Home: FC = () => {
    return (
        <Stack gap={4}>
            <Input placeholder="접속하고자 하는 주소" type="text" />
            <Input placeholder="횟수" type="number" />
            <Input placeholder="몇초마다 접속" type="number" />
            <Button>시작</Button>
        </Stack>
    );
};
