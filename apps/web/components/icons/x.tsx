import type { IconProps } from "./types";

export default function XIconRound({ size = 28 }: IconProps) {
  return (
    <div className="rounded-full bg-slate-700 p-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size - 16}
        height={size - 16}
        viewBox="0 0 300 271"
        className="fill-white"
      >
        <path
          xmlns="http://www.w3.org/2000/svg"
          d="m236 0h46l-101 115 118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123-113-148h94.9l65.5 86.6zm-16.1 244h25.5l-165-218h-27.4z"
        />
      </svg>
    </div>
  );
}
