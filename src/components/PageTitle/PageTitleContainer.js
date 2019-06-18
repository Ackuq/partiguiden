import Paper from '@material-ui/core/Paper';
import { styled } from '@material-ui/styles';

const PageTitleContainer = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  textAlign: 'center',
  padding: '1.5rem 0.25rem',
  marginBottom: '1rem',
  color: '#fff',
  minHeight: '5rem'
}));

export default PageTitleContainer;
