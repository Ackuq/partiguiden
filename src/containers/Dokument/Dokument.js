import React, { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import parse from 'html-react-parser';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

import { apiLinks } from '../../utils';
import LoadCircle from '../../components/LoadCircle';
import styles from './styles';

const useStyles = makeStyles(styles);

const Dokument = ({ id }) => {
  const classes = useStyles();

  const [body, setBody] = useState(null);

  useEffect(() => {
    const url = `${apiLinks.riksdagenApi}/dokument/${id}`;

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

Dokument.propTypes = {
  id: PropTypes.string.isRequired
};

export default Dokument;
