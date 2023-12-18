import React, { useState, useEffect } from "react";
import { Grid, Card, Divider, TextField, Button, Box, CardContent, Typography } from "@mui/material";
import commonService from "../../../service/menu/commonService";
import { useSelector } from "react-redux";
import { axiosCredential } from "../../../service/serviceConfig";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import RecentlyViewed from "../../route/product-details/recently-viewed/RecentlyViewed"
import { IMAGE_URL } from "../../../service/serviceConfig";


export default function RewardCashback() {
  // hooks
  const userInfo = useSelector((state) => state.auth.userInfo);
  const recent = useSelector((state) => state.auth.recentView);
  const persist = useSelector((state) => state);
  useEffect(() => {
    // console.log(recent);
  }, [persist]);
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
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
  }));
  var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay: true,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
    // slidesToScroll: 1
  };
  // console.log(data.reward_point);
  return (
    <>
      {data.reward_point >= 1 ?
        (<>
          <h3>Reward Points and Cashback</h3>
          <Grid container spacing={2}>
            <Grid item sm={6} xs={12}>
              <Card>
                <Grid container spacing={2} p={1}>
                  <Grid item sm={6}>
                    <h3>
                      <img
                        width="30px"
                        src="/img/credits.svg"
                        alt="coinlogo"
                      />{" "}
                      Credits
                    </h3>
                    <p>
                      <small>Pending Credits {data.pending_credit_amount}   Tk</small>
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
              {/* <Divider /> */}
            </Grid>
          </Grid>
        </>
        ) : (
          <>
            <h3 >Reward Points and Cashback</h3>
            <p>You don’t have any points currently.</p>
            <p>
              <span className="pb-0">You currently don’t have enough miahClub points </span>
              <br />
              <span>to unlock credits.</span>
            </p>
          </>)
      }
      <div className="mt-20">
        <h4>HOW TO GET MORE MIAHCLUB REWARDS</h4>
        <Slider {...settings}>
          <Card sx={{ minHeight: '141px', background: '#000', p: '12px' }}>
            <Box sx={{ display: 'flex', p: 1, justifyContent: "space-between", color: '#fff' }}>
              <h3 style={{ color: '#ffffff' }}>
                Level 2
              </h3>
              <h5 style={{ color: 'white' }}>
                <strong>Miah</strong>Club
              </h5>
            </Box>
            <Box sx={{ p: 1, mt: -3 }}>
              <h3 style={{ color: '#ffffff' }}>
                <small>One Time Free Shipping</small>
              </h3>
              {/* <p style={{ marginBottom: '0px', color: '#ffffff' }}>
              <small>BDDAY-</small>
            </p> */}
            </Box>
          </Card>
          <Card sx={{ minHeight: '141px', background: '#000', p: '12px' }}>
            <Box sx={{ display: 'flex', p: 1, justifyContent: "space-between" }}>
              <h3 style={{ color: '#ffffff' }}>
                Level 3
              </h3>
              <h5 style={{ color: '#ffffff' }}>
                <strong>Miah</strong>Club
              </h5>
            </Box>
            <Box sx={{ p: 1, mt: -3 }}>
              <h3 style={{ color: '#ffffff' }}>
                <small>One Time Free Shipping and Birthday 15% Off </small>
              </h3>
              {/* <p style={{ marginBottom: '0px', color: '#ffffff' }}>
              <small>BDDAY-</small>
            </p> */}
            </Box>
          </Card>
          <Card sx={{ minHeight: '141px', background: '#000', p: '12px' }}>
            <Box sx={{ display: 'flex', p: 1, justifyContent: "space-between" }}>
              <h3 style={{ color: '#ffffff' }}>
                Level 4
              </h3>
              <h5 style={{ color: '#ffffff' }}>
                <strong>Miah</strong>Club
              </h5>
            </Box>
            <Box sx={{ p: 1, mt: -3 }}>
              <h3 style={{ color: '#ffffff' }}>
                <small>One Month 5% Off and Birthday 15% Off</small>
              </h3>
              {/* <p style={{ marginBottom: '0px', color: '#ffffff' }}>
              <small>BDDAY-</small>
            </p> */}
            </Box>
          </Card>
          <Card sx={{ minHeight: '141px', background: '#000', p: '12px' }}>
            <Box sx={{ display: 'flex', p: 1, justifyContent: "space-between" }}>
              <h3 style={{ color: '#ffffff' }}>
                Level 5
              </h3>
              <h5 style={{ color: '#ffffff' }}>
                <strong>Miah</strong>Club
              </h5>
            </Box>
            <Box sx={{ p: 1, mt: -3 }}>
              <h3 style={{ color: '#ffffff' }}>
                <small>Shipping All Time Free and Birthday 15% Off</small>
              </h3>
              {/* <p style={{ marginBottom: '0px', color: '#ffffff' }}>
              <small>BDDAY-</small>
            </p> */}
            </Box>
          </Card>
        </Slider>
      </div>
      
      <h3 className="mt-60">MORE OF WHAT YOU LOVE</h3>
      <p>We’ve collected some of our favourite products based on your preferences and purchases.</p>
      <div className="rewardrecent">
        <section className="    ps-bought">
          <div className="container">
            <div className="ps-bought__wapper">
              <ul className="ps-bought__product">
                {recent &&
                  recent.map((product, index) => {
                    return (
                      <li key={index}>
                        <Link href={`/product/${product.slug}`}>
                          <a>
                            <div className="ps-product ps-product--standard cursor-pointer">
                              <div className="ps-product__thumbnail">
                                <figure>
                                  <img
                                    className="ps-product__image-default"
                                    src={`${IMAGE_URL}/${product.img}`}
                                    alt={product.name}
                                  />
                                  <img
                                    className="ps-product__image-back"
                                    src={`${IMAGE_URL}/${product.img}`}
                                    alt={product.name}
                                  />
                                </figure>
                              </div>
                              <div className="ps-product__content">
                                <h5 className="ps-product__title">
                                  {product.name}
                                </h5>
                                <div className="ps-product__meta">
                                  <span className="ps-product__price">
                                    TK {product.price}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </a>
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </section>
      </div>
      <h3>MIAHCLUB POINTS AND REWARDS</h3>
      <p >{"This is your personal space. Get the low down on your membership status and all the points and rewards you've earned."}</p>
      <Card sx={{ p: 4 }}>
        <Grid container spacing={2}>
          <Grid item sm={7} xs={12} >
            <Grid container spacing={2} p={2} sx={{justifyContent:'space-between'}}>
              <Grid item sm={5} xs={12}>
                <p>It&apos;s go time. You now have access to all level 1 rewards. Explore your rewards and start earning points to unlock the next level.</p>
                {/* <Link href={''}>
                  <a style={{ textDecoration: 'underline' }}>
                    LEARN MORE
                  </a>
                </Link>
                <br />
                <Link href={''}>
                  <a style={{ textDecoration: 'underline' }}>
                    EXPLORE REWARDS
                  </a>
                </Link> */}
              </Grid>
              {/* <Grid item sm={3} xs={0}></Grid> */}
              <Grid item sm={4} xs={12} mt={1}>
                {userInfo.userLevel == 1 ?
                  <img
                    className = 'imgSize'
                    src="/img/miahclublevel/miah club level-01.svg"
                    alt="level1"
                  /> : userInfo.userLevel == 2 ? <img
                    className = 'imgSize'
                    src="/img/miahclublevel/miah club level-02.svg"
                    alt="level1"
                  /> : userInfo.userLevel == 3 ? <img
                    className = 'imgSize'
                    src="/img/miahclublevel/miah club level-03.svg"
                    alt="level1"
                  /> : userInfo.userLevel == 4 ? <img
                    className = 'imgSize'
                    src="/img/miahclublevel/miah club level-04.svg"
                    alt="level1"
                  /> : <img
                    className = 'imgSize'
                    src="/img/miahclublevel/miah club level-05.svg"
                    alt="level1"
                  />
                }
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={5} xs={12} sx={{ background: '#f7f7f7' }}>
            <Grid container spacing={2} p={2}>
              <Grid item sm={8} xs={8}>
                <h4>
                  Level Points
                </h4>
                <h1>{(userInfo.currentPoint)}</h1>
              </Grid>
              <Grid item sm={4} xs={4}>
                <h4>Next Level</h4>
                <h5>Level {userInfo.nextLevel}</h5>
                <h4>{userInfo.nextLevelPoint}</h4>
              </Grid>
              <Grid item sm={12}>
                {userInfo.userLevel == 1 ?
                  <BorderLinearProgress variant="determinate" value={Math.round((((userInfo.currentPoint)) * 100) / 5000)} /> : userInfo.userLevel == 2 ? <BorderLinearProgress variant="determinate" value={Math.round((((userInfo.currentPoint)) * 100) / 10000)} /> : userInfo.userLevel == 3 ? <BorderLinearProgress variant="determinate" value={Math.round((((userInfo.currentPoint)) * 100) / 20000)} /> : userInfo.userLevel == 4 ? <BorderLinearProgress variant="determinate" value={Math.round((((userInfo.currentPoint)) * 100) / 40000)} /> : null
                }
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
