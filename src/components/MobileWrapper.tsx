import { ReactNode } from "react";
import "./MobileWrapper.css";

export const MobileWrapperHelper = {
  shouldUseMobilePreview: (): boolean => {
    // Use mobile wrapper if screen width is larger than mobile breakpoint
    return window.innerWidth > 768;
  },
};

export function MobileWrapper({ children }: {
  children: ReactNode;
}) {
  const mobileWidth = 390; // iPhone 14 width

  return (
    <div className="mobile-wrapper-container">
      <div
        className="mobile-wrapper-device"
        style={{ width: `${mobileWidth}px` }}
      >
        {/* Device Frame */}
        <div className="device-frame">
          <div className="device-notch">
            <div className="notch-camera"></div>
            <div className="notch-speaker"></div>
          </div>
          
          {/* App Content */}
          <div className="mobile-wrapper-frame">
            {children}
          </div>
          
          {/* Home Indicator */}
          <div className="device-home-indicator"></div>
        </div>
      </div>
    </div>
  );
}
