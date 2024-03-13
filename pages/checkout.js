import { useEffect, useState } from "react";
import CheckOut from "../components/route/check-out/CheckOut";
import CheckOutProcess from "../components/route/check-out/CheckOutProcess";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { fetchLocations } from "../redux/checkout/checkoutActions";


export default function Checkout() {
  const dispatch = useDispatch()
  const persist = useSelector((state) => state)
  const userInfo = useSelector((state) => state.auth.userInfo)
  const shoppingBag = useSelector((state) => state.shoppingBag.shoppingCart)
  
  const router = useRouter()
  const [chekcout, setCheckout] = useState(false);
  const [newUserMobile, setNewUserMobile] = useState('');

  useEffect(() => {
    const {token} = userInfo
    token ? setCheckout(true): setCheckout(false)
  }, [userInfo])

  useEffect(() => {
    if (persist._persist.rehydrated) {
      if (shoppingBag.length < 1) {
        router.push("/");
      }
    }
  }, [persist])

  useEffect(() => {
    dispatch(fetchLocations());
  }, []);
  
  
  return <>{chekcout ? <CheckOut newUserMobile={newUserMobile} /> : <CheckOutProcess  setNewUserMobile={setNewUserMobile} setCheckout={setCheckout} />}</>;
}
