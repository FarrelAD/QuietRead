import { ReactNode } from "react";
import "./SettingsSection.css";

interface SettingsSectionProps {
  title: string;
  children: ReactNode;
}

export default function SettingsSection({ title, children }: SettingsSectionProps) {
  return (
    <div className="settings-section">
      <h3 className="section-title">{title}</h3>
      {children}
    </div>
  );
}
