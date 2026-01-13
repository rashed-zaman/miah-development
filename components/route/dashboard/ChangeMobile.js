// import React from "react";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import Box from "@mui/material/Box";
// import MobileOtpContainer from "../../opt/MobileOtpContainer";
// import CircularProgress from "@mui/material/CircularProgress";
// import axios from "axios";
// import { axiosCredential, BASE_URL } from "../../../service/serviceConfig";
// // import { BASE_URL } from "../../service/serviceConfig";

// export default function ChangeMobile({ userInfo }) {
//   // hooks
//   // state
//   const [loading, setLoading] = React.useState(false);
//   const [dialog, setDialog] = React.useState(false);
//   const [errMsg, setErrMsg] = React.useState("");
//   const [phoneNumber, setPhoneNumber] = React.useState(userInfo.phone);

//   // methods
//   const handeDialog = (status) => {
//     setDialog(status);
//   };

//   const handlePhoneNumber = (e) => {
//     setPhoneNumber(e.target.value);
//   };
//   const verifySucceed = () => {
//     console.log("success");
//   };

//   const sentOtp = () => {
//     setLoading(true);
//     const headers = {
//       "Content-Type": "application/json",
//       Authorization: "Bearer " + userInfo.token,
//     };

//     axiosCredential.get("sanctum/csrf-cookie").then((res) => {
//       axios
//         .get(BASE_URL + "customerOtp/" + phoneNumber, { headers })
//         .then(function (response) {
//           if (response.data.status === true) {
//             setDialog(true);
//             setLoading(false);
//           }
//           if (response.data.status === false) {
//             setLoading(false);
//             setErrMsg(response.data.msg);
//           }
//         })
//         .catch(function (error) {
//           console.log(error);
//         });
//     });
//   };

//   return (
//     <>
//       <Box px={2} py={1}>
//         <TextField
//           fullWidth
//           label="Moblile Number"
//           value={phoneNumber}
//           onChange={handlePhoneNumber}
//         />
//         <div>
//           <p className="textCenter textRed ">{errMsg}</p>
//         </div>
//         {loading ? (
//           <Button variant="contained" fullWidth>
//             <CircularProgress
//               color="inherit"
//               sx={{ marginRight: "10px" }}
//               size={18}
//             />
//           </Button>
//         ) : (
//           <Button
//             onClick={sentOtp}
//             variant="contained"
//             sx={{ marginTop: "15px" }}
//             fullWidth
//           >
//             Change Mobile
//           </Button>
//         )}
//       </Box>

//       <MobileOtpContainer
//         userInfo={userInfo}
//         phoneNumber={phoneNumber}
//         open={dialog}
//         verifySucceed={verifySucceed}
//         handeDialog={handeDialog}
//       />
//     </>
//   );
// }


import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

import MobileOtpContainer from "../../opt/MobileOtpContainer";
import { axiosCredential, BASE_URL } from "../../../service/serviceConfig";

const validationSchema = Yup.object({
  phone: Yup.string()
    .matches(/^[0-9]{11}$/, "Mobile must be exactly 11 digits")
    .required("Mobile number is required"),
});

export default function ChangeMobile({ userInfo }) {
  // State
  const [loading, setLoading] = React.useState(false);
  const [dialog, setDialog] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState("");

  // Methods
  const handeDialog = (status) => {
    setDialog(status);
  };

  const verifySucceed = () => {
    console.log("OTP verified successfully");
  };

  const formik = useFormik({
    initialValues: {
      phone: userInfo.phone || "",
    },
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userInfo.token,
      };

      axiosCredential.get("sanctum/csrf-cookie").then(() => {
        axios
          .get(BASE_URL + "customerOtp/" + values.phone, { headers })
          .then((response) => {
            if (response.data.status === true) {
              setDialog(true);
              setLoading(false);
              setErrMsg("");
            } else {
              setLoading(false);
              setErrMsg(response.data.msg || "Something went wrong.");
            }
          })
          .catch((error) => {
            console.error(error);
            setErrMsg("An error occurred while sending OTP.");
            setLoading(false);
          });
      });
    },
  });

  return (
    <>
      <Box px={2} py={1} component="form" onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          name="phone"
          label="Mobile Number"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
        />

        {errMsg && (
          <p className="textCenter textRed" style={{ marginTop: "10px" }}>
            {errMsg}
          </p>
        )}

        <Box mt={2}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
          >
            {loading ? (
              <CircularProgress color="inherit" size={20} />
            ) : (
              "Change Mobile"
            )}
          </Button>
        </Box>
      </Box>

      <MobileOtpContainer
        userInfo={userInfo}
        phoneNumber={formik.values.phone}
        open={dialog}
        verifySucceed={verifySucceed}
        handeDialog={handeDialog}
      />
    </>
  );
}
