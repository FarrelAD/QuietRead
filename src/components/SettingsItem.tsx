import {
  IonItem,
  IonLabel,
  IonIcon,
  IonToggle,
} from "@ionic/react";
import { chevronForwardOutline } from "ionicons/icons";
import "./SettingsItem.css";

interface SettingsItemProps {
  icon: string;
  iconColor: string;
  iconBackground: string;
  title: string;
  description: string;
  type?: "toggle" | "button";
  checked?: boolean;
  onToggle?: (checked: boolean) => void;
  onClick?: () => void;
}

export default function SettingsItem({
  icon,
  iconColor,
  iconBackground,
  title,
  description,
  type = "button",
  checked,
  onToggle,
  onClick,
}: SettingsItemProps) {
  return (
    <IonItem button={type === "button"} className="setting-item" onClick={onClick}>
      <div className="setting-icon-wrapper" style={{ background: iconBackground }}>
        <IonIcon icon={icon} style={{ color: iconColor }} />
      </div>
      <IonLabel>
        <h2>{title}</h2>
        <p>{description}</p>
      </IonLabel>
      {type === "toggle" && onToggle && (
        <IonToggle
          slot="end"
          checked={checked}
          onIonChange={(e) => onToggle(e.detail.checked)}
        />
      )}
      {type === "button" && (
        <IonIcon icon={chevronForwardOutline} slot="end" />
      )}
    </IonItem>
  );
}
