import * as React from "react";
import Svg, { Path } from "react-native-svg";

export default function ShareIcon({fill= "#292D32"}) {
  return (
    <Svg width="24" height="25" viewBox="0 0 24 25" fill="none">
      <Path
        d="M12 23.6348C10.52 23.6348 9.02999 23.0748 7.86999 21.9648C4.91999 19.1248 1.65999 14.5948 2.88999 9.20479C3.99999 4.31479 8.26999 2.12479 12 2.12479C12 2.12479 12 2.12479 12.01 2.12479C15.74 2.12479 20.01 4.31479 21.12 9.21479C22.34 14.6048 19.08 19.1248 16.13 21.9648C14.97 23.0748 13.48 23.6348 12 23.6348ZM12 3.62479C9.08999 3.62479 5.34999 5.17479 4.35999 9.53479C3.27999 14.2448 6.23999 18.3048 8.91999 20.8748C10.65 22.5448 13.36 22.5448 15.09 20.8748C17.76 18.3048 20.72 14.2448 19.66 9.53479C18.66 5.17479 14.91 3.62479 12 3.62479Z"
        fill={fill}
      />
      <Path
        d="M10.75 14.6248C10.56 14.6248 10.37 14.5548 10.22 14.4048L8.72 12.9048C8.43 12.6148 8.43 12.1348 8.72 11.8448C9.01 11.5548 9.49 11.5548 9.78 11.8448L10.75 12.8148L14.22 9.34479C14.51 9.05479 14.99 9.05479 15.28 9.34479C15.57 9.63479 15.57 10.1148 15.28 10.4048L11.28 14.4048C11.13 14.5548 10.94 14.6248 10.75 14.6248Z"
        fill={fill}
      />
    </Svg>
  );
}
