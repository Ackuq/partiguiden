import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { useTheme } from "@mui/material/styles";

import type { MemberDetailedResponse } from "../../types/member";

import Picture from "./Picture";

interface Props {
  member: MemberDetailedResponse;
}

const ProfilePicture: React.FC<Props> = ({ member }) => {
  const theme = useTheme();

  return (
    <>
      <Box
        position="relative"
        height={142}
        display="flex"
        mb="100px"
        pt="50px"
        bgcolor={
          theme.palette.mode === "dark" ? "primary.dark" : "primary.light"
        }
        justifyContent="center"
        boxShadow={2}
      >
        <Picture
          firstName={member.firstName}
          lastName={member.lastName}
          pictureUrl={member.pictureUrl}
          party={member.party !== "-" ? member.party : undefined}
          size={192}
        />
      </Box>
      <Box textAlign="center" py={2}>
        <Typography variant="h6" component="span">
          {member.status}
          {member.isLeader && " och partiledare"}
        </Typography>
        <Typography variant="h4" component="h1">
          {member.firstName} {member.lastName}
        </Typography>
        <Typography variant="h6" color="textPrimary" component="span">
          {member.age} år
        </Typography>
      </Box>
    </>
  );
};

export default ProfilePicture;
