import { useContext } from 'react';
import { ThemeContext } from 'styled-components';

export const theme = {
  colors: {
    orange: '#FFC989',
    green: '#98F090',
    blue: '#9EE8F9',
    pink: '#FFC2D5',
    red: '#F17878',
    yellow: '#F2F551',
    mint: '#71E3CF',
    purple: '#D6C2FF',
    grey: '#C2C2C2',
    white: '#FFFFFF',
  },
  categoryColorList: [
    '#FFFFFF',
    '#F17878',
    '#FFC989',
    '#F2F551',
    '#98F090',
    '#9EE8F9',
    '#71E3CF',
    '#D6C2FF',
    '#FFC2D5',
  ],
};

export const useTiryTheme = (): typeof theme =>
  useContext<typeof theme>(ThemeContext);
