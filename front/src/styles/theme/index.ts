import { extendTheme } from '@chakra-ui/react';
import styles from './styles';
import colors from './foundations/colors';
import radii from './foundations/radii';
import {
  fontSizes, fontWeights,
} from './foundations/fonts';

const theme = extendTheme({
  styles,
  colors,
  fontWeights,
  fontSizes,
  radii,
});

export default theme;