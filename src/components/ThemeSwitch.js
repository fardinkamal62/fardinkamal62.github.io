'use client'

import { DarkMode, LightModeOutlined } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { useTheme } from "next-themes";

const ThemeSwitch = () => {
    const { theme, setTheme } = useTheme();

    const handleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <Tooltip title={`Toggle Night Mode ${theme === 'light' ? 'On' : 'Off'}`}>
            <IconButton onClick={handleTheme} className={'p-0'}>
                {theme === 'light' ? <DarkMode alt='night-mode-toggle' /> : <LightModeOutlined className={'dark:text-white'} alt='light-mode-toggle' />}
            </IconButton>
        </Tooltip>
    );
};

export default ThemeSwitch;