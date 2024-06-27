'use client';

import type { FC } from 'react';
import { useState, useRef, useEffect } from 'react';
import { Stack, Button, Paper, TextField } from '@mui/material';
import { LinearProgressWithLabel } from '@/components/molecules';

const style = {
    wrapper: {
        py: 4,
    },
};

export const Home: FC = () => {
    const [active, setActive] = useState(false);
    const [error, setError] = useState(false);
    const [progress, setProgress] = useState(0);

    const urlRef = useRef<HTMLInputElement>(null);
    const countRef = useRef<HTMLInputElement>(null);
    const intervalRef = useRef<HTMLInputElement>(null);
    const iFrameRef = useRef<HTMLIFrameElement>(null);
    const timerRef = useRef<number | null>(null);

    useEffect(() => {
        const startLoading = () => {
            const url = urlRef.current?.value;
            const count = parseInt(countRef.current?.value || '1', 10);
            const interval = parseInt(intervalRef.current?.value || '2', 10);
            const iFrame = iFrameRef.current;

            if (!url || !count || !interval || !iFrame) {
                setActive(false);
                setError(true);
                return;
            }

            let i = 0;
            const loadNext = () => {
                if (iFrame.contentWindow) {
                    iFrame.src = url;
                    i += 1;
                    setProgress((i / count) * 100);
                    if (i < count) {
                        timerRef.current = window.setTimeout(loadNext, interval * 1000);
                    } else {
                        setActive(false);
                    }
                }
            };

            loadNext();
        };

        if (active) {
            startLoading();
        }

        return () => {
            if (timerRef.current !== null) {
                clearTimeout(timerRef.current);
            }
        };
    }, [active]);

    const handleClick = () => {
        setProgress(0);
        setError(false);
        setActive(true);
    };

    return (
        <Stack gap={4} sx={style.wrapper}>
            <TextField
                required
                error={error}
                disabled={active}
                label="접속하고자 하는 주소"
                type="text"
                placeholder="http/https"
                inputRef={urlRef}
                fullWidth
            />
            <Stack direction="row" gap={2}>
                <TextField
                    disabled={active}
                    label="접속 횟수"
                    type="number"
                    placeholder="1"
                    inputRef={countRef}
                    fullWidth
                />
                <TextField
                    disabled={active}
                    label="몇초마다 접속"
                    type="number"
                    placeholder="2"
                    inputRef={intervalRef}
                    fullWidth
                />
            </Stack>
            <Stack direction="row" gap={2}>
                <Button disabled={active} onClick={handleClick} fullWidth variant="contained">
                    시작
                </Button>
                <Button disabled={!active} onClick={() => setActive(false)} fullWidth variant="outlined">
                    정지
                </Button>
            </Stack>
            <LinearProgressWithLabel value={progress} />
            <Paper elevation={3}>
                <iframe width="100%" height="345" title="iframe" ref={iFrameRef} style={{ border: 'none' }} />
            </Paper>
        </Stack>
    );
};
