import { makeStyles } from '@material-ui/core/styles';

import Breadcrumbs, { BreadcrumbsProps } from './Breadcrumbs';
import SocialMediaShare, { SocialMediaShareProps } from './SocialMediaShare';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});

interface Props {
  breadcrumbsProps: BreadcrumbsProps;
  socialMediaShareProps: SocialMediaShareProps;
}

const BreadcrumbsSocialMediaShare: React.FC<Props> = ({
  socialMediaShareProps,
  breadcrumbsProps,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Breadcrumbs {...breadcrumbsProps} />
      <SocialMediaShare {...socialMediaShareProps} />
    </div>
  );
};

export default BreadcrumbsSocialMediaShare;
