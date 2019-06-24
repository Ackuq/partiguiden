import React, { useState, useEffect } from 'react';
import { withRouter } from 'next/router';
import Head from 'next/head';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';

import { fetchJSON, apiLinks } from '../src/utils';
import SocialMediaShare from '../src/components/SocialMediaShare';
import LoadCircle from '../src/components/LoadCircle';
import PageTitle from '../src/components/PageTitle';
import Subject from '../src/containers/Subject';
import getData from '../src/containers/Subject/lib/getSubjectData';

const SubjectContainer = ({ router }) => {
  const { id } = router.query;
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [partyData, setPartyData] = useState(null);

  const url = `${apiLinks.partiguidenApi}/subject?id=${id}`;

  useEffect(() => {
    fetchJSON(url).then(subject => {
      setName(subject.name);
      getData(subject.opinions).then(opinionData => {
        const filtered = opinionData.filter(party => party !== undefined);
        setPartyData(filtered);
        setLoading(false);
      });
    });
  }, [id]);

  return (
    <React.Fragment>
      <Head>
        <title>{name && `${name} | `} | Ämne | Partiguiden.nu</title>
        <meta
          name="description"
          content={`Vad tar Sveriges partier för ståndpunkter inom ämnet ${name} Här hittar du informationen du behöver för att kunna jämföra och hitta det parti du sympatiserar med mest! `}
        />
      </Head>
      <PageTitle title={name} />
      <Container>
        <SocialMediaShare title={name} />
        {loading ? <LoadCircle /> : <Subject partyData={partyData} loading={loading} />}
      </Container>
    </React.Fragment>
  );
};

SubjectContainer.propTypes = {
  router: PropTypes.object.isRequired
};

export default withRouter(SubjectContainer);
