import * as React from "react";
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeMiterlimit={10}
      strokeWidth={1.693}
      d="M18.197 14.904c-.68-.684-2.323-1.681-3.12-2.084-1.039-.523-1.124-.565-1.94.041-.545.405-.907.766-1.544.63-.637-.135-2.022-.902-3.234-2.11-1.213-1.209-2.023-2.633-2.16-3.268-.136-.635.231-.993.632-1.539.565-.769.523-.897.04-1.936-.377-.807-1.404-2.435-2.09-3.11-.734-.726-.734-.598-1.207-.401a6.844 6.844 0 0 0-1.104.588c-.684.455-1.064.832-1.329 1.4C.876 3.68.756 5.01 2.127 7.5c1.37 2.49 2.332 3.763 4.322 5.748 1.99 1.984 3.52 3.051 5.758 4.306 2.768 1.55 3.83 1.248 4.398.983.569-.265.948-.642 1.403-1.325.23-.349.428-.718.59-1.103.197-.471.325-.471-.401-1.205Z"
    />
  </svg>
);
export default SvgComponent;