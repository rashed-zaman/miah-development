import { useEffect, useState } from "react";
import CheckOut from "../components/route/check-out/CheckOut";
import CheckOutProcess from "../components/route/check-out/CheckOutProcess";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { setLocations } from "../redux/checkout/checkoutActions";
import commonService from "../service/menu/commonService";

export default function Checkout() {
  const dispatch = useDispatch();
  const persist = useSelector((state) => state);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const shoppingBag = useSelector((state) => state.shoppingBag.shoppingCart);

  const router = useRouter();
  const [chekcout, setCheckout] = useState(false);
  const [newUserMobile, setNewUserMobile] = useState("");

  const fetchLocations = () => {
    commonService
      .getData("allLocation")
      .then((res) => {
        console.log("hello");
        const menu = res;
        if (menu.length > 0) {
          dispatch(setLocations(menu));
        }
        setCheckout(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const { token } = userInfo;
    if (token) {
      fetchLocations();
    } else {
      setCheckout(false);
    }
  }, [userInfo]);

  useEffect(() => {
    if (persist._persist.rehydrated) {
      if (shoppingBag.length < 1) {
        router.push("/");
      }
    }
  }, [persist]);

  return (
    <>
      {chekcout ? (
        <CheckOut newUserMobile={newUserMobile} />
      ) : (
        <CheckOutProcess
          setNewUserMobile={setNewUserMobile}
          setCheckout={setCheckout}
        />
      )}
    </>
  );
}
