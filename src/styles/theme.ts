import { useContext } from 'react';
import { ThemeContext } from 'styled-components';

export const theme = {
  colors: {
    // === deprecated ===
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
    // === deprecated ===

    green1: '#58CAB5`',
    green2: '#092E27`',

    purple1: '#9299FF',
    purple2: '#404DB7',
    purple3: '#16132E',
    purple4: '#080A20',

    grey1: '#BBBBBB',
    grey2: '#999999',
    grey3: '#464646',

    black1: '#242424',
    black2: '#171717',

    white1: '#FFFFFF',
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

export type Theme = typeof theme;

export const useTheme = (): Theme => useContext<Theme>(ThemeContext);
