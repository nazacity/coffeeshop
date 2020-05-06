import React from 'react';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  media: {
    height: '15vh',
    maxHeight: 250,
  },
}));

const PromotionItemList = ({ promotion: { pictureUrl, title, detail } }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={pictureUrl}
          title="Contemplative Reptile"
        />
        <CardContent style={{ height: '20%' }}>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
        </CardContent>
        <CardContent style={{ height: '20%' }}>
          <Typography variant="body2" color="textSecondary" component="p">
            {detail}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{ height: '20%' }}>
        <Button size="small" color="primary">
          แชร์
        </Button>
        <Button size="small" color="primary">
          เพิ่มเติม
        </Button>
      </CardActions>
    </Card>
  );
};

export default PromotionItemList;
