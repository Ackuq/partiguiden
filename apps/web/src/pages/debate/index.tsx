import type { NextPage } from "next";
import Head from "next/head";

import ConnectWithoutContact from "@mui/icons-material/ConnectWithoutContact";
import Debates from "../../containers/Debates";
import PageTitle from "../../components/PageTitle";

const DebatesContainer: NextPage = () => (
  <>
    <Head>
      <title>Debatter | Partiguiden</title>
      <meta
        name="description"
        content="Här hittar du en lista på de senaste debatterna i riksdagen."
      />
    </Head>
    <PageTitle title="Debatter" Icon={ConnectWithoutContact} />
    <Debates />
  </>
);

export default DebatesContainer;
