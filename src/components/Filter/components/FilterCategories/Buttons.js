import React from 'react';
import Button from '@material-ui/core/Button';

const Buttons = ({ loadAll, setLoadAll }) => (
  <React.Fragment>
    {loadAll ? (
      <Button onClick={() => setLoadAll(false)} style={{ borderRadius: 0 }}>
        Visa mindre
      </Button>
    ) : (
      <Button onClick={() => setLoadAll(true)} style={{ borderRadius: 0 }}>
        Visa mer
      </Button>
    )}
  </React.Fragment>
);

export default Buttons;
