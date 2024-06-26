import type { FC, PropsWithChildren } from 'react';
import { ThemeProvider as MUIThemProvider, createTheme } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
    return (
        <AppRouterCacheProvider options={{ key: 'dx' }}>
            <MUIThemProvider theme={darkTheme}>{children}</MUIThemProvider>
        </AppRouterCacheProvider>
    );
};
