import React from 'react';

// Redux
import { useSelector } from 'react-redux';

// Next
import Head from 'next/head';
import Link from '../../src/Link';

// Framer-motion
import { motion } from 'framer-motion';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';

// components
import PromotionItemList from './components/PromotionItemList';

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: 'Oswald',
    fontSize: '1em',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '0.2em',
    width: '80%',
  },
  headerCard: {
    maxWidth: 345,
  },
  recentlyCustomer: {
    display: 'inline-block',
    '&:not(:first-of-type)': {
      marginLeft: '-8vw',
    },
  },
  recentlyCustomerAvatar: {
    border: '2px solid white',
  },
  userAvatar: {
    minHeight: '80px',
    minWidth: '80px',
    maxWidth: '150px',
    maxHeight: '150px',
    width: '20vw',
    height: '20vw',
    boxShadow: theme.common.shadow.main,
  },
  cardRoot: {
    boxShadow: theme.common.shadow.black,
  },
}));

const faces = [
  'http://i.pravatar.cc/300?img=1',
  'http://i.pravatar.cc/300?img=2',
  'http://i.pravatar.cc/300?img=3',
  'http://i.pravatar.cc/300?img=4',
];

const MbPromote = ({ promotions }) => {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const matches600down = useMediaQuery('(max-width:600px)');

  return (
    <React.Fragment>
      <Head>
        <link rel="stylesheet" type="text/css" href="/styles/cardpromote.css" />
        <script
          src="https://kit.fontawesome.com/20efa4bcb4.js"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            duration: 1,
            ease: 'easeOut',
            delay: 1.8,
          },
        }}
        exit={{ opacity: 0 }}
        style={{ padding: '0 3vw', marginBottom: '15vw' }}
      >
        <div>
          <Card className={classes.cardRoot}>
            <CardContent>
              <Typography
                variant="h1"
                style={{ fontSize: '20px', fontWeight: 600 }}
              >
                Katty Coffee
              </Typography>
              <Divider style={{ margin: '1vh auto', width: '80%' }} />
              <Typography variant="body2" color="textSecondary" component="p">
                ร้านกาแฟยอดนิยมที่มียอดขาย ทั้งออนไลน์ และออนไลน์ สตอร์
                ร้านแคทตี้ ตกแต่งร้านอย่างมีเอกลักษณ์เฉพาะตัว บรรยากาศเรียบง่าย
                กับสไตล์การแต่งที่ไม่เหมือนกันใคร
                เรียกได้ว่ามาดื่มด่ำกับรสชาติกาแฟที่หอมกรุ่นแล้วยังได้เสพงานศิลป์ไปพร้อม
                ๆ กันด้วย สำหรับภายในร้านมีบรรยากาศวินเทจผสมผสานล้านนา
                ตกแต่งด้วยภาพวาดจากศิลปินหลากหลายคน รวมถึงมี 2 โซนให้เลือกนั่ง
                คือ โซนด้านหน้าร้าน ซึ่งมีต้นไม้ร่มรื่น
                แต่สำหรับใครที่ไม่ชอบนั่งกลางแจ้ง ทางร้านก็มีโซนภายในร้านรองรับ
                และโซนชั้นสองที่มีการจัดวางโต๊ะในมุมต่าง ๆ
                สำหรับคนที่ต้องการความเป็นส่วนตัวมากยิ่งขึ้น
              </Typography>
              <Divider style={{ margin: '1vh auto', width: '80%' }} />
            </CardContent>
            <CardActionArea>
              <CardContent style={{ overflow: 'hidden' }}>
                {user.state === 'guess' || user.state === 'client0' ? (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div>
                      <Avatar
                        src={
                          user.state === 'guess'
                            ? './images/homepage/register.jpg'
                            : user.pictureUrl
                        }
                        alt="Register"
                        className={classes.userAvatar}
                      />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                      }}
                    >
                      <Typography
                        variant="h3"
                        color="primary"
                        style={{ fontSize: '20px', marginBottom: '20px' }}
                      >
                        กรุณาลงทะเบียน
                      </Typography>
                      <Button
                        component={Link}
                        href="/user"
                        variant="outlined"
                        color="primary"
                      >
                        ลงทะเบียน
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div>
                      <Avatar
                        src={user.pictureUrl}
                        alt="user.name"
                        className={classes.userAvatar}
                      />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                      }}
                    >
                      <List component="nav" aria-label="man detail">
                        <Typography
                          variant="h3"
                          color="primary"
                          style={{ fontSize: '20px' }}
                        >
                          ยินดีต้อนรับ
                        </Typography>
                        <ListItemText
                          primary={`คุณ ${user.firstName} ${user.lastName}`}
                        />
                      </List>
                    </div>
                  </div>
                )}
              </CardContent>
            </CardActionArea>
            <CardContent>
              <Divider style={{ margin: '1vh auto', width: '80%' }} />
              <Typography
                variant="h1"
                style={{ fontSize: '20px', fontWeight: 600 }}
              >
                Recently customer
              </Typography>
              <div style={{ display: 'flex' }}>
                {faces.map((face, i) => (
                  <div key={face} className={classes.recentlyCustomer}>
                    <IconButton>
                      <Avatar
                        src={face}
                        className={classes.recentlyCustomerAvatar}
                      />
                    </IconButton>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardContent>
              <Divider style={{ margin: '1vh auto', width: '80%' }} />
              <Typography
                variant="h1"
                style={{ fontSize: '20px', fontWeight: 600, margin: '1vh 0' }}
              >
                Promotion
              </Typography>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: matches600down ? '1fr' : '1fr 1fr',
                  gridGap: '1vw',
                }}
              >
                {promotions.map((promotion) => (
                  <PromotionItemList key={promotion.id} promotion={promotion} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </React.Fragment>
  );
};

export default MbPromote;
