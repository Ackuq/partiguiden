declare module 'react-google-publisher-tag' {
  import React from 'react';

  interface Props {
    path: string;
    format?: string;
    canBeLower?: boolean;
    enableSingleRequest?: boolean;
    id?: string;
    dimensions?: Array<string>;
    targeting?: any;
    onSlotRenderEnded?: () => void;
    onImpressionViewable?: () => void;
    onSlotVisibilityChanged?: () => void;
    collapseEmpty?: boolean;
  }

  const GoogleAd: React.FC<{ path: string }>;

  export default GoogleAd;
}
