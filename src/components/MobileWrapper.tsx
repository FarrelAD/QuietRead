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
        className="mobile-wrapper-frame"
        style={{ width: `${mobileWidth}px` }}
      >
        {children}
      </div>
    </div>
  );
}
