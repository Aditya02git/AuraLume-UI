// TextArea Component Export
export { default } from './TextArea';
export { default as TextArea } from './TextArea';

// You can also export any additional utilities or constants if needed
export const TEXTAREA_VARIANTS = {
  DEFAULT: 'default',
  COUNTER: 'counter',
  AUTO_EXPAND: 'auto-expand'
};

export const TEXTAREA_DEFAULTS = {
  minHeight: 60,
  maxHeight: 300,
  rows: 4,
  placeholder: 'Start typing...'
};