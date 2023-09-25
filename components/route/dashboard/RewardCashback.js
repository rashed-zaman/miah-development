import React, { useState, useEffect } from "react";
import { Grid, Card, Divider, TextField, Button } from "@mui/material";
import commonService from "../../../service/menu/commonService";
import { useSelector } from "react-redux";
import { axiosCredential } from "../../../service/serviceConfig";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import Link from "next/link";

export default function RewardCashback() {
  // hooks
  const userInfo = useSelector((state) => state.auth.userInfo);
  console.log(userInfo);
  // local state
  const [points, setPoints] = useState(0);
  const [msg, setMsg] = useState("");
  const [data, setData] = useState({
    credit_amount: 0,
    pending_credit_amount: 0,
    pending_reward: 0,
    reward_point: 0,
    status: 1,
  });

  // methods
  const handlePoints = (e) => {
    setPoints(e.target.value);
    console.log(e.target.value);
  };
  const convertPoints = () => {
    setMsg("");
    const body = {
      credit_point: points,
    };

    axiosCredential.get("sanctum/csrf-cookie").then((res) => {
      commonService
        .postAuthData("convertRewardPoint_toCredit", body, userInfo.token)
        .then((res) => {
          if (res.data.status === 1) {
            setPoints(null);
            setMsg(res.data.msg);
          }
          if (res.data.status === 0) {
            setMsg(res.data.msg);
          }
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  const getRewards = () => {
    commonService
      .authGetData("rewardPoint", userInfo.token)
      .then((res) => {
        setData(res.data);
        // console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getRewards();
  }, []);
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
    },
  }));

  return (
    <>
      <h3>Reward Points and Cashback</h3>
      <Grid container spacing={2}>
        <Grid item sm={6} xs={12}>
          <Card>
            <Grid container spacing={2} p={1}>
              <Grid item sm={6}>
                <h3>
                  <img width="30px" src="/img/credits.svg" alt="coinlogo" />{" "}
                  Credits
                </h3>
                <p>
                  <small>Pending Credits {data.pending_credit_amount} Tk</small>
                </p>
              </Grid>
              <Grid item sm={6}>
                <h3>{data.credit_amount} Tk</h3>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Card sx={{ padding: "15px" }}>
            <h4>Convert Your Points To Credit</h4>
            <Grid container>
              <Grid item sm={8} xs={12}>
                <TextField
                  required
                  fullWidth
                  onChange={handlePoints}
                  variant="standard"
                  label="Enter Points"
                />
              </Grid>
              <Grid item sm={4} xs={12}>
                <Button
                  variant="contained"
                  sx={{ marginTop: "15px" }}
                  size="small"
                  onClick={convertPoints}
                >
                  Convert
                </Button>
              </Grid>
            </Grid>
            <div>{msg}</div>
          </Card>
        </Grid>
        <Grid item sm={12} mb={2}>
          <Divider />
        </Grid>
      </Grid>
      <Card>
        <Grid container spacing={2}>
          <Grid item sm={7} xs={12}>
            <Grid container spacing={2} p={2}>
              <Grid item sm={8} xs={8}>
                <p>
                  It&apos;s go time. You now have access to all level 1 rewards.
                  Explore your rewards and start earning points to unlock the
                  next level.
                </p>
                <Link href={""}>
                  <a style={{ textDecoration: "underline" }}>LEARN MORE</a>
                </Link>
                <br />
                <Link href={""}>
                  <a style={{ textDecoration: "underline" }}>EXPLORE REWARDS</a>
                </Link>
              </Grid>
              <Grid item sm={4} xs={4} mt={1}>
                {userInfo.userLevel == 1 ? (
                  <img
                    width="100%"
                    src="/img/miahclublevel/miah club level-01.svg"
                    alt="level1"
                  />
                ) : userInfo.userLevel == 2 ? (
                  <img
                    width="100%"
                    src="/img/miahclublevel/miah club level-02.svg"
                    alt="level1"
                  />
                ) : userInfo.userLevel == 3 ? (
                  <img
                    width="100%"
                    src="/img/miahclublevel/miah club level-03.svg"
                    alt="level1"
                  />
                ) : userInfo.userLevel == 4 ? (
                  <img
                    width="100%"
                    src="/img/miahclublevel/miah club level-04.svg"
                    alt="level1"
                  />
                ) : (
                  <img
                    width="100%"
                    src="/img/miahclublevel/miah club level-05.svg"
                    alt="level1"
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={5} xs={12}>
            <Card>
              <Grid container spacing={2} p={2}>
                <Grid item sm={8} xs={8}>
                  <h4>Level Points</h4>
                  {/* <h1>{data.reward_point}</h1> */}
                  <h1>{parseInt(userInfo.currentPoint)}</h1>
                </Grid>
                <Grid item sm={4} xs={4}>
                  <h4>Next Level</h4>
                  <h5>Level {userInfo.nextLevel}</h5>
                  <h4>{userInfo.nextLevelPoint}</h4>
                  {/* <p>
                      <small>*Pending points {data.pending_reward} </small>
                    </p> */}
                </Grid>
                <Grid item sm={12}>
                  {userInfo.userLevel == 1 ? (
                    <BorderLinearProgress
                      variant="determinate"
                      value={Math.round(
                        (parseInt(userInfo.currentPoint) * 100) / 5000
                      )}
                    />
                  ) : userInfo.userLevel == 2 ? (
                    <BorderLinearProgress
                      variant="determinate"
                      value={Math.round(
                        (parseInt(userInfo.currentPoint) * 100) / 10000
                      )}
                    />
                  ) : userInfo.userLevel == 3 ? (
                    <BorderLinearProgress
                      variant="determinate"
                      value={Math.round(
                        (parseInt(userInfo.currentPoint) * 100) / 20000
                      )}
                    />
                  ) : userInfo.userLevel == 4 ? (
                    <BorderLinearProgress
                      variant="determinate"
                      value={Math.round(
                        (parseInt(userInfo.currentPoint) * 100) / 40000
                      )}
                    />
                  ) : null}
                </Grid>
              </Grid>
            </Card>
          </Grid>
          {/* <Grid item sm={12} mb={2}>
            <Divider />
          </Grid> */}
        </Grid>
      </Card>
    </>
  );
}
