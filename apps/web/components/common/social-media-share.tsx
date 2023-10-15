"use client";
import FacebookIcon from "@components/icons/facebook";
import XIcon from "@components/icons/x";
// import { FacebookIcon, TwitterIcon, TwitterShareButton } from "react-share";
import { usePathname } from "next/navigation";

const size = 45;

export interface SocialMediaShareProps {
  title: string;
}

function facebookShare(href: string) {
  const params = new URLSearchParams({
    app_id: "1372247440372076",
    display: "page",
    href,
  });
  return `https://www.facebook.com/dialog/share?${params}`;
}

export default function SocialMediaShare({ title }: SocialMediaShareProps) {
  const pathname = usePathname();

  const href = "https://partiguiden.nu" + (pathname ?? "/");

  return (
    <div className="flex justify-end gap-2">
      <a target="_blank" href={facebookShare(href)}>
        <FacebookIcon size={size} />
      </a>
      <a
        className="twitter-share-button"
        href="https://twitter.com/intent/tweet"
      >
        <XIcon size={size} />
      </a>
    </div>
  );
}
