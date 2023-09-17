import type { NextPage } from "next";
import Head from "next/head";

import GavelIcon from "@mui/icons-material/GavelRounded";

import Decisions from "../containers/Decisions";
import PageTitle from "../components/PageTitle";

const RiksdagsbeslutContainer: NextPage = () => (
  <>
    <Head>
      <title>Riksdagsbeslut | Partiguiden</title>
      <meta
        name="description"
        content="Vad tar riksdagen för beslut? Här hittar du en sammanfattning på de senaste besluten som tas upp i riksdagen."
      />
    </Head>
    <PageTitle title="Riksdagsbeslut" Icon={GavelIcon} />
    <Decisions />
  </>
);

export default RiksdagsbeslutContainer;
