import React, { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import parse from 'html-react-parser';
import { withStyles } from '@material-ui/styles';
import LoadCircle from '../../components/LoadCircle';

import styles from './styles';

const Dokument = ({ id, classes }) => {
  const [body, setBody] = useState(null);

  useEffect(() => {
    const url = `https://data.riksdagen.se/dokument/${id}`;

    fetch(url)
      .then(res => res.text())
      .then(data => {
        let html = parse(data);
        if (!Array.isArray(html)) {
          html = [html];
        }
        setBody(html);
      });
  }, []);

  return (
    <div className={classes.dokumentBody}>
      {body ? (
        body.map(el => <React.Fragment key={el.key || el}>{el}</React.Fragment>)
      ) : (
        <LoadCircle />
      )}
    </div>
  );
};

export default withStyles(styles)(Dokument);
