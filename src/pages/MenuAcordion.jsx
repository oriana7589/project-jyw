import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Paper from '@mui/material/Paper';

const TuComponente = () => {
  const [expanded, setExpanded] = useState(0);

  const handleExpandClick = (panel) => {
    setExpanded(expanded === panel ? 0 : panel);
  };

  return (
    <Paper elevation={0} >
      {/* Card Arriba */}
      <Card sx={{ marginLeft:"55px",      borderRadius: 0, }}>
        <CardActions
          disableSpacing
          expand={expanded === 1 ? 'true' : undefined}
          onClick={() => handleExpandClick(1)}
          aria-expanded={expanded === 1}
          aria-label="show more"
          sx={{ backgroundColor: "rgb(12, 55, 100)" }}
        >
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded === 1} timeout="auto" unmountOnExit>
          {/* Contenido del primer card (Cliente) */}
          {/* <Cliente /> */}
        </Collapse>
      </Card>

      {/* Card al Pie de la Página */}
      <Card
        elevation={0}
        sx={{
          marginTop: '16px',
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          marginLeft:"55px",
          borderRadius: 0,
        }}
      >
        <CardActions
          disableSpacing
          expand={expanded === 2 ? 'true' : undefined}
          onClick={() => handleExpandClick(2)}
          aria-expanded={expanded === 2}
          aria-label="show more"
          sx={{ backgroundColor: "rgb(12, 55, 100)" }}
        >
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded === 2} timeout="auto" unmountOnExit>
          {/* Contenido del segundo card (Items) */}
          {/* <Items /> */}
        </Collapse>
      </Card>
    </Paper>
  );
};

export default TuComponente;