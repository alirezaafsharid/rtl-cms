import React from "react";
import "./Errorbax.css";

export default function Errorbax({ msg }) {
  return (
    <div className="cms-empty-error">
      <h1>{msg}</h1>
    </div>
  );
}
