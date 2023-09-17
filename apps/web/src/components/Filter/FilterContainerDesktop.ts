import { styled } from "@mui/material/styles";

const FilterContainerDesktop = styled("div")(
  ({ theme }) => `
    box-shadow: ${theme.shadows[1]};
    position: sticky;
    height: min-content;
    max-height: calc(100vh - 110px);
    background-color:
      ${
        theme.palette.mode === "dark"
          ? theme.palette.background.paper
          : theme.palette.grey[50]
      };
    top: 102px;
    overflow-y: auto;
    overflow-x: hidden;
    margin-right: auto;
`,
);

export default FilterContainerDesktop;
