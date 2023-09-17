import Typography from "@mui/material/Typography";
import useTheme from "@mui/system/useTheme";

import { useEffect, useState } from "react";
import { useTwitterInfo } from "../../hooks/wikidataHooks";
import LoadCircle from "../LoadCircle";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    twttr: any;
  }
}

interface Props {
  id: string;
}

const TwitterFeed: React.FC<Props> = ({ id }) => {
  const theme = useTheme();
  const [contentLoaded, setContentLoaded] = useState<boolean>(false);
  const twitterResponse = useTwitterInfo(id);
  const twitterHandle =
    twitterResponse?.results?.bindings?.[0]?.twitterHandle?.value;

  useEffect(() => {
    if (twitterHandle || !window.twttr) {
      const container = document.getElementById("twitterContainer");
      if (container) {
        container.innerHTML = "";
      }
      setContentLoaded(false);
      window.twttr.widgets
        .createTimeline(
          {
            sourceType: "profile",
            screenName: twitterHandle,
          },
          container,
          {
            theme: theme.palette.mode,
            chrome: "transparent nofooter noborders",
          },
        )
        .then(() => {
          setContentLoaded(true);
        });
    } else if (twitterResponse && !twitterHandle) {
      // We got a response, but no Twitter handle was found, set the content loaded to true and display message.
      setContentLoaded(true);
    }
  }, [theme.palette.mode, twitterHandle, twitterResponse]);

  return (
    <>
      <div
        id="twitterContainer"
        style={{ maxWidth: 500, marginRight: "auto", marginLeft: "auto" }}
      ></div>
      {!contentLoaded && <LoadCircle />}
      {contentLoaded && !twitterHandle && (
        <Typography variant="h6" component="p" align="center">
          Inget Twitterkonto hittades.
        </Typography>
      )}
    </>
  );
};

export default TwitterFeed;
