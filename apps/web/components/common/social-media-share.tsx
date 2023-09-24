"use client";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import { usePathname } from "next/navigation";

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
      <FacebookShareButton url={path} quote={title}>
        <FacebookIcon size={size} round />
      </FacebookShareButton>
      <TwitterShareButton url={path} title={title}>
        <TwitterIcon size={size} round />
      </TwitterShareButton>
    </div>
  );
}
