import * as React from "react";
import Svg, { Path } from "react-native-svg";

export default function ShareIcon({fill= "#292D32"}) {
  return (
    <Svg width="24" height="25" viewBox="0 0 24 25" fill="none">
      <Path
        d="M2.5 14.3V11.74C2.5 9.66996 4.19 7.97995 6.26 7.97995H17.74C19.81 7.97995 21.5 9.66996 21.5 11.74V13.18H19.48C18.92 13.18 18.41 13.3999 18.04 13.7799C17.62 14.1899 17.38 14.7799 17.44 15.4099C17.53 16.4899 18.52 17.2799 19.6 17.2799H21.5V18.4699C21.5 20.5399 19.81 22.2299 17.74 22.2299H6.26C4.19 22.2299 2.5 20.5399 2.5 18.4699"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M12.28 2.39995C13.52 1.92995 14.85 2.84998 14.85 4.17998V7.97997"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M2.5 12.6399V8.06998C2.5 6.87998 3.23 5.81993 4.34 5.39993L8.31 3.89993"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M22.56 14.1999V16.26C22.56 16.81 22.12 17.2599 21.56 17.2799H19.6C18.52 17.2799 17.53 16.4899 17.44 15.4099C17.38 14.7799 17.62 14.1899 18.04 13.7799C18.41 13.3999 18.92 13.18 19.48 13.18H21.56C22.12 13.2 22.56 13.6499 22.56 14.1999Z"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M7 12.2299H14"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}
