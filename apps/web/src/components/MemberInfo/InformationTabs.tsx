import { useState } from "react";
import Box from "@mui/system/Box";
import Documents from "./Documents";
import Paper from "@mui/material/Paper";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TwitterFeed from "./TwitterFeed";

interface Props {
  id: string;
  setDocumentCount: React.Dispatch<React.SetStateAction<number>>;
}

const InformationTabs: React.FC<Props> = ({ id, setDocumentCount }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Paper>
      <Tabs
        value={value}
        onChange={handleChange}
        sx={{ pb: 1 }}
        variant="fullWidth"
      >
        <Tab label="Dokument" />
        <Tab label={`Twitter-flöde`} />
      </Tabs>
      <Box sx={{ p: 2 }}>
        {value === 0 && (
          <Documents id={id} setDocumentCount={setDocumentCount} />
        )}
        {value === 1 && <TwitterFeed id={id} />}
      </Box>
    </Paper>
  );
};

export default InformationTabs;
