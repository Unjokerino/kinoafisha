import * as React from "react";
import Svg, { Path } from "react-native-svg";

export default function ShareIcon({ fill = "#292D32" }) {
  return (
    <Svg width="24" height="25" viewBox="0 0 24 25" fill="none">
      <Path
        d="M15.71 15.1844L12.61 13.3344C12.07 13.0144 11.63 12.2444 11.63 11.6144V7.51443"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M4 6.00443C2.75 7.67443 2 9.75443 2 12.0044C2 17.5244 6.48 22.0044 12 22.0044C17.52 22.0044 22 17.5244 22 12.0044C22 6.48443 17.52 2.00443 12 2.00443C10.57 2.00443 9.2 2.30442 7.97 2.85442"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}
