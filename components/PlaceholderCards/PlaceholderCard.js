import React from 'react';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';

const PlaceholderCards = () => {
  const renderPlaceholderCard = () => {
    const cards = [];
    for (let i = 0; i < 20; i += 1) {
      cards.push(
        <Grid item xs={12} key={`cardPlaceholder-${i}`}>
          <Card elevation={1} style={{ minHeight: '240px' }} />
        </Grid>
      );
    }
    return cards;
  };

  return (
    <Grid container spacing={16}>
      {renderPlaceholderCard()}
    </Grid>
  );
};

export default PlaceholderCards;
