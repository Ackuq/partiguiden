import Grid from "@material-ui/core/Grid";

const footer = () => (
  <footer className="py-4 mt-3 text-light">
    <Grid direction="column" justify="center" container className="text-center">
      <Grid item>
        <span>© Axel Pettersson 2019</span>
      </Grid>
      <Grid item>
        <span>
          <a href="mailto:contact@partiguiden.nu">contact@partiguiden.nu</a>
        </span>
      </Grid>
    </Grid>
  </footer>
);

export default footer;
