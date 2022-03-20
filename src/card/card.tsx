import React from "react";
import "./card.css";

interface Props {
  padding?: boolean;
}

export const Card: React.FC<Props> = ({ children, padding }) => {
  let pad = "0";
  if (padding) {
    pad = "2em";
  }

  return (
    <div className="card" style={{ padding: pad }}>
      {children}
    </div>
  );
};
