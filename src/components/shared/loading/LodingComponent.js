import React from "react";

const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "80vh",
      textAlign: "center",
    },
    spinner: {
      animation: "spin 1.5s linear infinite",
    },
  };


export default function LodingComponent() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
          <div style={styles.container}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              width="50"
              height="50"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
              style={styles.spinner}
            >
              <circle cx="50" cy="50" r="40" strokeOpacity="0.3" />
              <circle
                cx="50"
                cy="50"
                r="40"
                strokeDasharray="251.2"
                strokeDashoffset="0"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="251.2"
                  to="0"
                  dur="1.5s"
                  repeatCount="indefinite"
                  keyTimes="0; 1"
                  values="251.2; 0"
                />
              </circle>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
