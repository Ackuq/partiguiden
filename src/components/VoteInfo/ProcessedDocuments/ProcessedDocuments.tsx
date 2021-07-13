import React, { useState } from 'react';
import Link from 'next/link';

import { Typography, Collapse } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import RotatingArrow from '../shared/RotatingArrow';
import SectionButton from '../shared/SectionButton';
import { Vote } from '../../../types/voting';

import * as ROUTES from '../../../lib/routes';

interface Props {
  processedDocuments: Vote['processedDocuments'];
}

const ProcessedDocuments: React.FC<Props> = ({ processedDocuments }) => {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);

  return (
    <div style={{ marginBottom: '1rem' }}>
      <SectionButton onClick={() => setVisible(!visible)}>
        <Typography variant="h5" color="inherit">
          Behandlade dokument
        </Typography>
        <RotatingArrow style={visible ? { transform: 'rotate(180deg)' } : undefined} />
      </SectionButton>
      <Collapse in={visible}>
        <div style={{ marginTop: '1.25rem' }}>
          {processedDocuments.map((document, index) => (
            <React.Fragment key={document.id}>
              <Link href={ROUTES.DOCUMENT} as={ROUTES.getDocumentHref(document.id)} passHref>
                <Typography
                  component="a"
                  variant="body1"
                  color={theme.palette.mode === 'dark' ? 'secondary' : 'primary'}
                >
                  [{index}] {document.label}
                </Typography>
              </Link>
              <br />
            </React.Fragment>
          ))}
        </div>
      </Collapse>
    </div>
  );
};

export default ProcessedDocuments;
