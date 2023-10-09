import PageTitle from "@components/common/page-title";
import { getSubjects } from "@partiguiden/party-data/reader";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { routes } from "@lib/navigation";
import dynamic from "next/dynamic";

const ResponsiveAd = dynamic(() => import("@components/ads/responsive-ad"), {
  ssr: false,
});

export const metadata = {
  title: "Partiernas ståndpunkter | Partiguiden",
  description:
    "Vad tar Sveriges partier för ståndpunkter i olika ämnen och sakfrågor? Jämför Sveriges partier politik och hitta det parti du sympatiserar mest med nu!",
};

const shiftColors = [
  "[&:nth-child(3n)]:bg-gray-100",
  "[&:nth-child(3n+1)]:bg-gray-200",
  "[&:nth-child(3n+2)]:bg-gray-200/60",
  "dark:[&:nth-child(3n)]:bg-background-elevated-dark",
  "dark:[&:nth-child(3n+1)]:bg-background-elevated-dark",
  "dark:[&:nth-child(3n+2)]:bg-background-elevated-dark",
].join(" ");

export default function Subjects() {
  const subjects = getSubjects().sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  return (
    <main>
      <PageTitle Icon={PencilSquareIcon}>Partiernas Ståndpunkter</PageTitle>
      <div className="mb-4 sm:container">
        <div className="border-l-primary grid grid-cols-1 border-l-2 border-t-2 border-t-slate-300 dark:border-t-slate-700 md:grid-cols-2">
          {subjects.map((subject) => (
            <Link
              key={subject.id}
              href={routes.standpoint(subject.id)}
              className={`${shiftColors} group`}
            >
              <span className="to-primary group:hover:transition-all inline-block bg-gradient-to-l from-transparent from-50% to-50% bg-[length:200%_100%] bg-right px-3 py-4 duration-300 group-hover:bg-left group-hover:text-white">
                {subject.name}
              </span>
            </Link>
          ))}
        </div>
        <ResponsiveAd className="mt-4" />
      </div>
    </main>
  );
}
