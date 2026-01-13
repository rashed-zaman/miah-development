import React ,{useState,useEffect}from "react";
import { Card, Divider, Box, Grid, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import ChangePassword from "./ChangePassword";
import ChangeEmail from "./ChangeEmail";
import ChangeMobile from "./ChangeMobile";
import ChangeBirthday from "./ChangeBirthday";
import { signOut } from 'next-auth/react';
import { defaultAddress, formInitialValue } from "@/app/demoData/demoData";
import { useRouter } from "next/navigation";
import commonService from "../../../service/menu/commonService";
import { resetShoppingCart } from "@/store/shoppingBagSlice";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';
import { logout } from "@/store/authSlice";
import { resetForm } from "@/store/checkoutSlice";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {xs:'95%', sm:'50%'},
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
export default function AccountInformation() {
  // hooks
  const userInfo = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();
  const route = useRouter();
  // state
  const [passwordCheckd, setPasswordCheckd] = React.useState(false);
  const [emailCheckd, setEmailCheckd] = React.useState(false);
  const [mobileCheckd, setMobileCheckd] = React.useState(false);
  const [birthDayCheckd, setBirthDayCheckd] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openb, setOpenb] = React.useState(false);
  const handleOpenB = () => setOpenb(true);
  const handleCloseB = () => setOpenb(false);
  const [openc, setOpenc] = React.useState(false);
  const handleOpenC = () => setOpenc(true);
  const handleCloseC = () => setOpenc(false);
  const [opend, setOpend] = useState(false);
  const handleOpenD = () => setOpend(true);
  const handleCloseD = () => setOpend(false);

  const [data, setData] = useState({});

  const handlePasswordChange = () => {
    setPasswordCheckd((prev) => !prev);
  };
  const handleEmailChange = () => {
    setEmailCheckd((prev) => !prev);
  };
  const handleMobileChange = () => {
    setMobileCheckd((prev) => !prev);
  };
  const handleBirthDayChange = () => {
    setBirthDayCheckd((prev) => !prev);
  };

  const logoutAccount = () => {
    const data = {
      formInitialValue: formInitialValue,
      defaultAddress: defaultAddress,
    };

    dispatch(logout());

    dispatch(resetForm(data));
    route.push("/");
    signOut({ redirect: false })
    handleLogout()
    dispatch(resetShoppingCart());
  };
  const handleLogout = () => {
    commonService
      .postAuthData("logout", {}, userInfo.token)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    commonService.authGetData("profile", userInfo.token)
    .then((res) => {
      setData(res.data.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);
  return (
    <>
      <Card variant="outlined">
        <Box
          sx={{
            padding: "0px 15px",
            paddingTop: '5px',
            paddingBottom: '60px',
          }}
        >
          <div className="pt-15">
            <h3>MY DETAILS</h3>
            <span>Feel free to edit any of your details below so your account is up to date.</span>
          </div>
          <div className="pt-30">
            <h3>DETAILS</h3>
            <p style={{textTransform:'uppercase'}}>{data.first_name+' '+ data.last_name}</p>
            <p>{data.birthday}</p>
            <p style={{textTransform:'uppercase'}}>{data.gender}</p>
            <span onClick={handleOpenD} className="editBtn"><a><b>EDIT</b></a></span>
          </div>
          <div className="pt-30">
            <h3>LOGIN DETAILS</h3>
            <h4>EMAIL</h4>
            <p className="pb-0">{data.email}</p>
            <span onClick={handleOpen} className="editBtn"><b>EDIT</b></span>
            <h4 className="mt-15">MOBILE</h4>
            <p className="pb-0">{data.phone}</p>
            <span onClick={handleOpenB} className="editBtn"><b>EDIT</b></span>
            <h4 className="mt-15">PASSWORD</h4>
            <p className="pb-0">*************</p>
            <span onClick={handleOpenC} className="editBtn"><b>EDIT</b></span>
          </div>
          <div className="pt-30">
            <h3>LOG OUT FROM DEVICE</h3>
            <p>{"This will log you out from web browsers you have used to access the miah website. To log in again, you'll have to enter your credentials."}</p>
            <div className="col-md-8 accLogOut" onClick={logoutAccount}>
              <span> LOG ME OUT</span>
              <span><ArrowForwardIcon /></span>
            </div>
          </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                  EDIT YOUR EMAIL
                  <div className="cancelIcon" onClick={handleClose}>
                    <ClearIcon/>
                  </div>
                  </Typography>
                  <ChangeEmail userInfo={userInfo} data={data} setOpen={setOpen}/>
                </Box>
            </Modal>
            <Modal
                open={openb}
                onClose={handleCloseB}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    EDIT YOUR MOBILE NUMBER
                  <div className="cancelIcon" onClick={handleCloseB}>
                    <ClearIcon/>
                  </div>
                  </Typography>
                  <ChangeMobile userInfo={userInfo} />
                </Box>
            </Modal>
            <Modal
                open={openc}
                onClose={handleCloseC}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                  EDIT YOUR PASSWORD
                  <div className="cancelIcon" onClick={handleCloseC}>
                    <ClearIcon/>
                  </div>
                  </Typography>
                  <ChangePassword userInfo={userInfo} setOpenc={setOpenc}/>
                </Box>
            </Modal>
            <Modal
                open={opend}
                onClose={handleCloseD}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                  EDIT YOUR DETAILS
                  <div className="cancelIcon" onClick={handleCloseD}>
                    <ClearIcon/>
                  </div>
                  </Typography>
                  <ChangeBirthday data={data} userInfo={userInfo} setOpend={setOpend}/>
                </Box>
            </Modal>
        </Box>
      </Card>

      {passwordCheckd ? (
        <Card variant="outlined" sx={{ marginTop: "20px" }}>
          <Box
            sx={{
              borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
              padding: "0px 15px",
            }}
          >
            <h4>Change Password</h4>
            <Divider />
          </Box>

          <Grid container spacing={2}>
            <Grid size={{ sm:6}}>
              <ChangePassword userInfo={userInfo} setOpend={setOpend}/>
            </Grid>
          </Grid>
        </Card>
      ) : null}

      {emailCheckd ? (
        <Card variant="outlined" sx={{ marginTop: "20px" }}>
          <Box
            sx={{
              borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
              padding: "0px 15px",
            }}
          >
            <h4>Change Email</h4>
          </Box>
          <Grid container spacing={2}>
            <Grid size={{xs:12, sm:6}} mt={2}>
              <ChangeEmail userInfo={userInfo} />
            </Grid>
          </Grid>
        </Card>
      ) : null}

      {mobileCheckd ? (
        <Card variant="outlined" sx={{ marginTop: "20px" }}>
          <Box
            sx={{
              borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
              padding: "0px 15px",
            }}
          >
            <h4>Change Mobile</h4>
          </Box>
          <Grid container spacing={2}>
            <Grid  size={{xs:12, sm:6}} mt={2}>
              <ChangeMobile userInfo={userInfo} />
            </Grid>
          </Grid>
        </Card>
      ) : null}
      {birthDayCheckd ? (
        <Card variant="outlined" sx={{ marginTop: "20px" }}>
          <Box
            sx={{
              borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
              padding: "0px 15px",
            }}
          >
            <h4>Change Birthday</h4>
          </Box>
          <Grid container spacing={2}>
            <Grid  mt={2} size={{xs:12, sm:6}}>
              <ChangeBirthday userInfo={userInfo} />
            </Grid>
          </Grid>
        </Card>
      ) : null}
    </>
  );
}
