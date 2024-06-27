import type { FC, PropsWithChildren } from 'react';
import { Container } from '@mui/material';

export const Wrapper: FC<PropsWithChildren> = ({ children }) => {
    return <Container maxWidth={false}>{children}</Container>;
};
