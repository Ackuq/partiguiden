import type { NextPage } from "next";
import Head from "next/head";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import ErrorIcon from "@mui/icons-material/Error";

import PageTitle from "../components/PageTitle";

const Custom404: NextPage = () => {
  return (
    <>
      <Head>
        <title>404 | Sidan hittades inte | Partiguiden</title>
      </Head>

      <PageTitle title="404 - Sidan hittades inte" Icon={ErrorIcon} />

      <Container>
        <Card>
          <CardContent>
            <Typography variant="h6" align="center">
              Sidan du letade har kanske blivit borttagen, eller skrev du in en
              felaktig URL.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default Custom404;
