import Image from "next/image";
import { githubProfile, linkedIn } from "../src/lib/socials";

export default function Footer() {
  return (
    <footer className="bg-primary-elevated-light dark:bg-primary-elevated-dark mt-auto flex flex-col gap-3 py-6 text-center text-white">
      <span>© Axel Pettersson 2023</span>
      <a href="mailto:hello@partiguiden.se">hello@partiguiden.se</a>
      <span className="flex items-center justify-center gap-8">
        <a href={linkedIn} target="_blank" rel="noopener noreferrer">
          <Image
            src="/static/images/linkedin_logo.png"
            height={28}
            width={28}
            alt="LinkedIn logo"
          />
        </a>
        <a href={githubProfile} target="_blank" rel="noopener noreferrer">
          <Image
            src="/static/images/github_logo.png"
            height={28}
            width={28}
            alt="GitHub logo"
          />
        </a>
      </span>
    </footer>
  );
}
