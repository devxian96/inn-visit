'use client';

import type { FC } from 'react';
import { useState, useRef, useEffect } from 'react';
import { Stack, Input, Button } from '@mui/material';

const style = {
    wrapper: {
        py: 4,
    },
};

export const Home: FC = () => {
    const [active, setActive] = useState(false);
    const urlRef = useRef<HTMLInputElement>(null);
    const countRef = useRef<HTMLInputElement>(null);
    const intervalRef = useRef<HTMLInputElement>(null);
    const iFrameRef = useRef<HTMLIFrameElement>(null);
    const timerRef = useRef<number | null>(null);

    useEffect(() => {
        const startLoading = () => {
            const url = urlRef.current?.value;
            const count = parseInt(countRef.current?.value || '', 10);
            const interval = parseInt(intervalRef.current?.value || '', 10);
            const iFrame = iFrameRef.current;

            if (!url || !count || !interval || !iFrame) {
                setActive(false);
                return;
            }

            let i = 0;
            timerRef.current = window.setInterval(() => {
                if (iFrame.contentWindow) {
                    iFrame.src = 'about:blank';
                    setTimeout(() => {
                        iFrame.src = url;
                    }, 1000); // 1초 후에 원래 URL로 설정
                }
                i += 1;
                if (i >= count) {
                    clearInterval(timerRef.current!);
                    setActive(false);
                }
            }, interval * 1_000);
        };

        if (active) {
            startLoading();
        }

        return () => {
            if (timerRef.current !== null) {
                clearInterval(timerRef.current);
            }
        };
    }, [active]);

    const handleClick = () => {
        setActive(true);
    };

    return (
        <Stack gap={4} sx={style.wrapper}>
            <Input disabled={active} placeholder="접속하고자 하는 주소" type="text" inputRef={urlRef} />
            <Stack direction="row" gap={2}>
                <Input disabled={active} placeholder="접속 횟수" type="number" inputRef={countRef} fullWidth />
                <Input disabled={active} placeholder="몇초마다 접속" type="number" inputRef={intervalRef} fullWidth />
                <Input disabled={active} placeholder="체류시간 초" type="number" inputRef={intervalRef} fullWidth />
            </Stack>
            <Stack direction="row" gap={2}>
                <Button disabled={active} onClick={handleClick} fullWidth>
                    시작
                </Button>
                <Button disabled={!active} onClick={() => setActive(false)} fullWidth>
                    정지
                </Button>
            </Stack>
            <iframe width="0" height="0" style={{ display: 'none' }} title="iframe" ref={iFrameRef} />
        </Stack>
    );
};
