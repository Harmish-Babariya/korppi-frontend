import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const LoadingOverlay = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999, // Ensure the overlay appears on top of other content
      }}
    >
      <CircularProgress color="inherit" />
    </div>
  );
};

export default LoadingOverlay;
