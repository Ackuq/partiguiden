import React, { useState } from 'react';
import Link from 'next/link';

import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';

import RotatingArrow from './RotatingArrow';
import SectionButton from './SectionButton';
import { Vote } from '../../types/voting';

interface Props {
  processedDocuments: Vote['processedDocuments'];
}

const ProcessedDocuments: React.FC<Props> = ({ processedDocuments }) => {
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
              <Link href="/dokument/[id]" passHref>
                <Typography component="a" variant="body1" color="primary">
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
