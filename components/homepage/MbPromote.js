import React from 'react';

// Next
import Head from 'next/head';

// Framer-motion
import { motion } from 'framer-motion';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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
}));

const MbPromote = ({ promoteObject }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));
  const matchesSMup = useMediaQuery(theme.breakpoints.up('sm'));
  return (
    <>
      <Head>
        <link rel="stylesheet" type="text/css" href="/styles/cardpromote.css" />
        <script
          src="https://kit.fontawesome.com/20efa4bcb4.js"
          crossorigin="anonymous"
        ></script>
      </Head>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: matchesXS ? 0 : '2em',
        }}
      >
        <div>
          <motion.img
            src="./images/homepage/home1.png"
            alt="coffee cafe"
            height="120px"
            initial={{ opacity: 0, x: '-40%' }}
            animate={{ opacity: 1, x: '0%' }}
            exit={{
              opacity: 0,
              x: '-40%',
              transition: {
                duration: 1.2,
                ease: 'easeInOut',
              },
            }}
            transition={{
              duration: 1.2,
              ease: 'easeInOut',
              delay: 1.8,
            }}
          />
        </div>
        <motion.div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '0 20px',
          }}
          initial={{ opacity: 0, y: '20%' }}
          animate={{ opacity: 1, y: '0%' }}
          exit={{
            opacity: 0,
            y: '20%',
            transition: {
              duration: 1.2,
              ease: 'easeInOut',
            },
          }}
          transition={{
            duration: 1.2,
            ease: 'easeInOut',
            delay: 1.8,
          }}
        >
          <Typography variant="h3" align="center" className={classes.title}>
            Coffee Cafe
          </Typography>
          <Typography variant="body1" className={classes.content}>
            ระบบจำลอง full system e-commerce รองรับการยืนยันตัวตนด้วย Line
            เพื่อเพิ่มความสะดวกสบายให้กับผู้ใช้งาน ทั้ง Admin และ Client
            ระบบออกแบบมาให้คล้ายกับ POS มีทั้งเว็บ FRONT สำหรับ โปรโมท โฆษณา
            สั่ง สินค้า/อาหาร ระบบตะกร้า ชำระเงินด้วย PAYMENT GATEWAY เว็บ ADMIN
            สำหรับจัดการสินค้า คลัง สรุปข้อมูล และอื่นๆ
            ทั้งยังมีระบบแจ้งเตือนลูกค้าด้วย LINE OA ให้ครบวงจร
          </Typography>
          <Typography variant="body1" className={classes.content}>
            ใช้เทคโนโลยีการเขียน WEB APP สมัยใหม่ NEXTJS REDUX GRAPHQL
            ให้ประสบการณ์ความรวดเร็วของการใช้งาน ฝากระบบบน FIREBASE ระบบเดียว
            บริการ SERVERLESS จาก GOOGLE ทั้ง HOSTING และ DATABASE จึงมั่นใจใน
            ความปลอดภัย และสเถียรของระบบ เหมาะกับธุรกิจขนาดเล็ก-กลาง
            ที่ไม่ต้องการวุ่นวายกับระบบ SERVER ของตัวเอง
            เพราะมีค่าใช้จ่ายที่ถูกกว่าในการติดตั้ง และดูแล SERVER ของตัวเอง
            ทั้งยังสามารถ SCALE ระบบเพิ่มขึ้นได้
          </Typography>
          <Typography variant="body1" className={classes.content}>
            รายละเอียดเพิ่มเติม 0881493995 (ตั้ว) หรือเยี่ยมชม MY RESUME
          </Typography>
          <a href="https://myresume-c62b3.firebaseapp.com/">
            <Button variant="contained" color="primary">
              MY RESUME
            </Button>
          </a>
        </motion.div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '100%',
          marginTop: '1em',
          marginBottom: '100px',
        }}
      >
        {promoteObject?.map((object) => (
          <motion.div
            key={object.id}
            className="box"
            style={{
              marginTop: '2em',
              width: matchesSMup ? '200px' : '100px',
              height: matchesSMup ? '200px' : '100px',
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{
              scale: 0.8,
              opacity: 0,
              transition: {
                duration: 0.8,
                ease: 'easeInOut',
              },
            }}
            transition={{
              duration: 1.2,
              ease: 'easeInOut',
              delay: 1.4,
            }}
          >
            <div className="imgBx">
              <img src={object.imageUrl} />
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default MbPromote;
