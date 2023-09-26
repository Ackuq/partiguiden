import { githubProfile, linkedIn } from "@lib/socials";
import GithubIcon from "@components/icons/github";
import LinkedInIcon from "@components/icons/linkedIn";

export default function Footer() {
  return (
    <footer className="bg-primary dark:bg-primary-elevated-dark mt-auto flex flex-col gap-3 py-6 text-center text-white">
      <span>© Axel Pettersson 2023</span>
      <a href="mailto:hello@partiguiden.se">hello@partiguiden.se</a>
      <span className="flex items-center justify-center gap-3">
        <a href={linkedIn} target="_blank" rel="noopener noreferrer">
          <LinkedInIcon />
        </a>
        <a href={githubProfile} target="_blank" rel="noopener noreferrer">
          <GithubIcon />
        </a>
      </span>
    </footer>
  );
}
