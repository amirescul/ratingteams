import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles={
 
};

function MediaCard(props) {
  const { classes, data } = props;
  return (
    <Card className={classes.card}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {data.name}
          </Typography>
          <Typography component="p">
            {data.project}
          </Typography>
        </CardContent>

      <CardActions>
        <Button size="small" color="primary" onClick={props.clickFunction} >
          Detalii
        </Button>

        <Button size="small" color="primary" onClick = {props.deleteFunction}>
          Sterge
        </Button>
       
      </CardActions>
    </Card>
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);