import * as React from 'react';

interface IPropTypes {
  left?: Array<{ text: React.ReactNode; onPress?: () => void; type?: any; style?: any; className?: string}>;
  right?: Array<{ text: React.ReactNode; onPress?: () => void; type?: any; style?: any; className?: string}>;
  open?: boolean;
  autoClose?: boolean;
  onOpen?: (open: boolean) => void;
  onClose?: (open: boolean) => void;
  disabled?: boolean;
  style?: any;
  /* web only */
  prefixCls?: string;
}

export default IPropTypes;
