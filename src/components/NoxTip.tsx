interface NoxTipProps {
  tip: string;
}

export default function NoxTip({ tip }: NoxTipProps) {
  return (
    <div className="nox-tip">
      <div className="tip-icon">💡</div>
      <div className="tip-content">
        <div className="tip-title">Nox's Tip</div>
        <div className="tip-text">{tip}</div>
      </div>
    </div>
  );
}
