import styled from '@emotion/styled';

const DocumentBody = styled.div`
  margin-top: 1rem;
  * {
    ${({ theme }) =>
      theme.palette.mode === 'dark'
        ? `
          color: #fff !important;
          border-color: #fff !important;
`
        : ``}
  }
  table {
    display: block;
    max-width: 100%;
  }
  h1 {
    color: ${({ theme }) => theme.palette.primary.light};
    font-size: 1.75rem;
  }
  a {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;

const Document: React.FC<{ body: string }> = ({ body }) => {
  // eslint-disable-next-line react/no-danger
  return <DocumentBody dangerouslySetInnerHTML={{ __html: body }} />;
};

export default Document;
