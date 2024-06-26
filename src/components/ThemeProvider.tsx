import type { FC, PropsWithChildren } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
    return <AppRouterCacheProvider options={{ key: 'dx' }}>{children}</AppRouterCacheProvider>;
};
