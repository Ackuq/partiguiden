import PageTitle from "@components/common/page-title";
import LoadingList from "@components/loading/list";
import { DocumentCheckIcon } from "@heroicons/react/24/solid";

export default function Loading() {
  return (
    <main>
      <PageTitle Icon={DocumentCheckIcon}>Riksdagsbesult</PageTitle>
      <div className="mx-4 mb-4 flex gap-2 2xl:container 2xl:mx-auto">
        <LoadingList />
      </div>
    </main>
  );
}
