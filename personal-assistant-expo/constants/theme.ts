export const theme = {
  light: {
    background: '#F7F8FA',
    card: '#FFFFFF',
    text: '#17181A',
    muted: '#73777D',
    border: '#E7E8EC',
    tint: '#5B5CE2',
    tintSoft: '#EEEEFF',
    success: '#2E9B65',
    danger: '#C94A55',
  },
  dark: {
    background: '#0F1012',
    card: '#181A1E',
    text: '#F5F6F7',
    muted: '#9EA2AA',
    border: '#292C32',
    tint: '#9A9BF7',
    tintSoft: '#25263A',
    success: '#58C98B',
    danger: '#F07882',
  },
} as const;

export type ThemeColors = (typeof theme)[keyof typeof theme];
