import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import { Grid, Card, Divider, TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import {authGetData} from '@/lib/commonService'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function HeaderUserInfo() {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [data, setData] = useState({
    credit_amount: 0,
    pending_credit_amount: 0,
    pending_reward: 0,
    reward_point: 0,
    status: 1,
  });
  const getRewards = () => {
    authGetData("rewardPoint", userInfo.token)
      .then((res) => {
        setData(res.data);
        // console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    userInfo.token && getRewards();
  }, []);
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 5,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
  }));
  return (
    <>
      <Box sx={{ width: "100%", border: "1px solid rgba(0,0,0,.12)" }}>
        <List component="nav" aria-label="main mailbox folders" className="pt-0">
          <Grid container spacing={2} p={2}>
            <Grid size={{sm: 6, xs: 6}}>
              <h4 style={{ textTransform: 'uppercase' }}>Hi {userInfo.first_name}</h4>
              {userInfo.userLevel == 1 ?
                <img
                  width="100%"
                  src="/img/miahclublevel/miah club level-01.svg"
                  alt="level1"
                /> : userInfo.userLevel == 2 ? <img
                  width="100%"
                  src="/img/miahclublevel/miah club level-02.svg"
                  alt="level1"
                /> : userInfo.userLevel == 3 ? <img
                  width="100%"
                  src="/img/miahclublevel/miah club level-03.svg"
                  alt="level1"
                /> : userInfo.userLevel == 4 ? <img
                  width="100%"
                  src="/img/miahclublevel/miah club level-04.svg"
                  alt="level1"
                /> : <img
                  width="100%"
                  src="/img/miahclublevel/miah club level-05.svg"
                  alt="level1"
                />
              }
            </Grid>
            <Grid  sx={{ textAlign: 'right' }}  size={{sm: 4, xs: 4}}>
              <p>
                <small>Points to spend</small>
              </p>
              {/* <h3>{data.reward_point}</h3>        */}
              <h3>{data.reward_point}</h3>
            </Grid>
            <Grid size={12}>
            {userInfo.userLevel == 1 ?
                <BorderLinearProgress variant="determinate" value={Math.round(((userInfo.currentPoint) * 100) / 5000)} />: userInfo.userLevel == 2 ? <BorderLinearProgress variant="determinate" value={Math.round(((userInfo.currentPoint) * 100) / 10000)} />: userInfo.userLevel == 3 ? <BorderLinearProgress variant="determinate" value={Math.round((((userInfo.currentPoint)) * 100) / 20000)} /> : userInfo.userLevel == 4 ? <BorderLinearProgress variant="determinate" value={Math.round((((userInfo.currentPoint)) * 100) / 40000)} /> : null
              }
            </Grid>
            <div className='headerUser'>
              <Link href={'/profile/rewards'} className='headerUserposition'>
                  <span>Visit Your Account</span>
                  <span><ArrowForwardIcon/></span>
              </Link>
              <Link href={''}>
                  <span>Points history</span>
                  <span><ArrowForwardIcon/></span>
              </Link>
            </div>
          </Grid>
        </List>
      </Box>

    </>
  )
}
