import NextLink from "next/link";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { styled } from "@mui/material/styles";

import * as ROUTES from "../../lib/routes";

import type { Leader as LeaderType } from "../../types/member";
import type { PartyData } from "../../types/party";
import Picture from "../MemberInfo/Picture";

const LeaderCard = styled(Paper)(
  ({ theme }) => `
    height: 100%;
    padding: 1rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    :hover {
      background-color:
        ${
          theme.palette.mode === "dark"
            ? theme.palette.grey[800]
            : theme.palette.grey[200]
        };
      box-shadow: ${theme.shadows[10]};
    }
`,
);

const Leader: React.FC<LeaderType> = ({
  id,
  role,
  firstName,
  lastName,
  pictureUrl,
}) => {
  return (
    <Grid item md={3} sm={4} xs={6}>
      <NextLink
        passHref
        href={ROUTES.MEMBER}
        as={ROUTES.getMemberHref(id)}
        style={{ textDecoration: "none" }}
      >
        <LeaderCard elevation={0}>
          <Picture
            firstName={firstName}
            lastName={lastName}
            pictureUrl={pictureUrl}
          />

          <div>
            <Typography variant="subtitle2" component="p">
              {firstName} {lastName}
            </Typography>

            {!!role && <Typography>{role}</Typography>}
          </div>
        </LeaderCard>
      </NextLink>
    </Grid>
  );
};

interface Props {
  party: PartyData;
}

const Leaders: React.FC<Props> = ({ party }) => (
  <Paper sx={{ padding: "1rem", marginBottom: "1rem" }}>
    <Typography gutterBottom variant="h4" align="center">
      Ledning
    </Typography>
    <Grid container spacing={2} justifyContent="center">
      {party.leaders.map((leader) => (
        <Leader key={leader.sourceId} {...leader} />
      ))}
    </Grid>
  </Paper>
);

export default Leaders;
