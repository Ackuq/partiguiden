import React, { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
// ES Modules
import parse from 'html-react-parser';
import LoadCircle from '../../LoadCircle';

import './styles.scss';

const Dokument = ({ id }) => {
  const [body, setBody] = useState(null);

  useEffect(() => {
    const url = `https://data.riksdagen.se/dokument/${id}`;

    fetch(url)
      .then(res => res.text())
      .then(data => {
        const html = parse(data);
        let initialBody;
        if (Array.isArray(html)) {
          for (let i = 0; i < html.length; i += 1) {
            if (html[i].type && html[i].type === 'div') {
              initialBody = html[i];
              break;
            }
          }
        } else initialBody = html;
        setBody(initialBody);
      });
  }, []);

  return <React.Fragment>{body || <LoadCircle />}</React.Fragment>;
};

export default Dokument;
