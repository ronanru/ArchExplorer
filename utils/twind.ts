import { IS_BROWSER } from '$fresh/runtime.ts';
import { Configuration, setup } from 'twind';
export * from 'twind';

export const config: Configuration = {
  mode: 'silent',
  theme: {
    container: {
      center: true
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px'
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#147EB3'
        }
      }
    }
  }
};

if (IS_BROWSER) setup(config);
