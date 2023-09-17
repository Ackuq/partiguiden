import { useRouter } from "next/router";
import ContainerList from "../components/ContainerList";
import DebateListContainer from "../components/DebateList/DebateList";
import Filter from "../components/ParlimentFilter/Filter";

import {
  queryAttrToArray,
  queryAttrToNumber,
  queryAttrToString,
} from "../utils";

const Debates: React.FC = () => {
  const router = useRouter();
  const search = queryAttrToString(router.query.search);
  const page = queryAttrToNumber(router.query.page, 1);
  const org = queryAttrToArray(router.query.org);

  return (
    <div style={{ display: "flex" }}>
      <ContainerList maxWidth="md">
        <DebateListContainer router={router} page={page} />
      </ContainerList>
      <Filter router={router} search={search} org={org} />
    </div>
  );
};

export default Debates;
