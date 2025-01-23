import * as React from "react";
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={19}
    height={19}
    fill="none"
    {...props}
  >
    <g fill="currentColor" clipPath="url(#a)">
      <path d="M12.24 8.652 8.433 6.569a.693.693 0 0 0-.692.012.693.693 0 0 0-.343.601v4.13c0 .25.127.474.34.601a.697.697 0 0 0 .69.016l3.808-2.048a.7.7 0 0 0 .004-1.229Zm-3.832 2.141V7.706l2.845 1.557-2.845 1.53Z" />
      <path d="m18.078 5.977-.001-.008c-.015-.138-.16-1.372-.76-2-.693-.738-1.48-.827-1.857-.87a4.605 4.605 0 0 1-.086-.01l-.03-.004c-2.278-.166-5.719-.188-5.753-.188h-.006c-.035 0-3.475.022-5.774.188l-.03.003-.081.01c-.374.043-1.151.133-1.847.898-.571.62-.736 1.828-.753 1.964l-.002.017A35.788 35.788 0 0 0 .97 8.788v1.29c0 1.38.122 2.754.127 2.811v.01c.015.136.16 1.347.758 1.975.652.713 1.476.807 1.92.858.07.008.13.015.17.022l.04.006c1.316.125 5.44.187 5.615.189h.011c.034 0 3.475-.023 5.753-.188l.03-.003c.029-.004.061-.008.097-.011.371-.04 1.145-.122 1.83-.876.572-.621.737-1.829.754-1.964l.002-.018c.005-.058.126-1.431.126-2.811v-1.29c0-1.379-.121-2.753-.127-2.81Zm-.884 4.101a35.37 35.37 0 0 1-.122 2.712c-.043.333-.217 1.097-.495 1.4-.43.472-.87.518-1.192.552a6.433 6.433 0 0 0-.107.012c-2.204.16-5.515.184-5.667.185-.171-.002-4.235-.065-5.51-.183a4.48 4.48 0 0 0-.211-.027c-.377-.043-.894-.103-1.292-.54l-.009-.01c-.273-.285-.443-.999-.486-1.385a35.292 35.292 0 0 1-.122-2.716v-1.29c0-1.275.111-2.588.122-2.712.051-.391.229-1.109.495-1.399.443-.486.91-.54 1.218-.576l.082-.01c2.236-.16 5.57-.184 5.69-.185.12.001 3.453.025 5.669.185l.088.01c.318.037.797.092 1.237.561l.004.004c.274.285.443 1.012.486 1.406.008.086.122 1.42.122 2.716v1.29Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M.971.81h17.233v17.233H.971z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgComponent;