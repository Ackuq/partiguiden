import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

import PageTitleContainer from './PageTitleContainer';

const PageTitle = ({ title, variant, Icon }) => (
  <PageTitleContainer square>
    {Icon && <Icon style={{ fontSize: '2.5rem' }} />}
    <Typography variant={variant}>{title}</Typography>
  </PageTitleContainer>
);

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  variant: PropTypes.string,
  Icon: PropTypes.oneOfType([PropTypes.func, PropTypes.node, PropTypes.object])
};

PageTitle.defaultProps = {
  variant: 'h1',
  Icon: null
};

export default PageTitle;
