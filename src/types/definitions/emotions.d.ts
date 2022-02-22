/// <reference types="@emotion/react/types/css-prop" />

import { Theme as MaterialUITheme } from '@mui/material/styles';

// Re-declare the emotion theme to have the properties of the MaterialUiTheme
declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends MaterialUITheme {}
}
