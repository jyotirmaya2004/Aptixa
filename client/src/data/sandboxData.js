import { SANDBOX_QUANTITATIVE } from './sandboxQuantitative';
import { SANDBOX_LOGICAL } from './sandboxLogical';
import { SANDBOX_TECHNICAL } from './sandboxTechnical';
import { SANDBOX_VERBAL_DATA } from './sandboxVerbalData';

export const SANDBOX_DATABASE = [
  ...SANDBOX_QUANTITATIVE,
  ...SANDBOX_LOGICAL,
  ...SANDBOX_TECHNICAL,
  ...SANDBOX_VERBAL_DATA
];

export const SANDBOX_STATS = {
  total: SANDBOX_DATABASE.length,
  quantitative: SANDBOX_QUANTITATIVE.length,
  logical: SANDBOX_LOGICAL.length,
  technical: SANDBOX_TECHNICAL.length,
  verbal: SANDBOX_VERBAL_DATA.length
};
