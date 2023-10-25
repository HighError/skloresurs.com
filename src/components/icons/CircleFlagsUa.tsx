import type { SVGProps } from 'react';

export default function CircleFlagsUa(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 512 512"
      {...props}
    >
      <mask id="circleFlagsUa0">
        <circle cx="256" cy="256" r="256" fill="#fff" />
      </mask>
      <g mask="url(#circleFlagsUa0)">
        <path fill="#ffda44" d="m0 256l258-39.4L512 256v256H0z" />
        <path fill="#338af3" d="M0 0h512v256H0z" />
      </g>
    </svg>
  );
}
