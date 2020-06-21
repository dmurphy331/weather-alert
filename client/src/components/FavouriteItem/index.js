import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import {
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Grid,
  IconButton,
  CardHeader,
} from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const useStyles = makeStyles({
  media: {
    height: 120,
  },
});

const FavouriteItem = ({ city, removeFavouriteClick }) => {
  const classes = useStyles();

  const removeFavourite = () => {
    removeFavouriteClick(city);
  };

  return (
    <Grid item xs={6}>
      <Card>
        <CardHeader
          action={
            <IconButton
              aria-label="remove from favorites"
              onClick={removeFavourite}
              color="secondary"
            >
              <HighlightOffIcon />
            </IconButton>
          }
          title={city.name}
        />
        <CardMedia
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent></CardContent>
        <CardActions>
          <Button size="small" color="primary">
            See forecast
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default FavouriteItem;
