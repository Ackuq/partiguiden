"use client";

import { usePathname } from "next/navigation";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterShareButton,
  XIcon,
} from "react-share";

const size = 45;

export interface SocialMediaShareProps {
  title: string;
}

export default function SocialMediaShare({ title }: SocialMediaShareProps) {
  const pathname = usePathname();

  const path =
    (process.env.NEXT_PUBLIC_BASE_PATH ?? "https://partiguiden.nu") +
    (pathname ?? "/");

  return (
    <div className="flex justify-end gap-2">
      <FacebookShareButton url={path} title={title}>
        <FacebookIcon size={size} round />
      </FacebookShareButton>
      <TwitterShareButton url={path} title={title}>
        <XIcon size={size} round />
      </TwitterShareButton>
    </div>
  );
}
