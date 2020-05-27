import React, { useState } from 'react';
import Link from 'next/link';

import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';

import RotatingArrow from './RotatingArrow';
import SectionButton from './SectionButton';

const ProcessedDocuments: React.FC<{ processedDocuments: Array<any> }> = ({
  processedDocuments,
}) => {
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
            <React.Fragment key={document[3]}>
              <Link href="/dokument/[id]" as={`/dokument/${document[3]}`}>
                <Typography
                  component="a"
                  variant="body1"
                  color="primary"
                  href={`/dokument/${document[3]}`}
                >
                  [{index}] {document[0]}
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
