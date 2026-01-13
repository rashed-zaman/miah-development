import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import CheckOut from "../components/route/check-out/CheckOut";
import CheckOutProcess from "../components/route/check-out/CheckOutProcess";
import { setLocations } from "../redux/checkout/checkoutActions";
import commonService from "../service/menu/commonService";
import LodingComponent from "../components/shared/loading/LodingComponent";

export default function Checkout() {
  const dispatch = useDispatch();
  const router = useRouter();

  const userInfo = useSelector((state) => state.auth.userInfo);
  const shoppingBag = useSelector((state) => state.shoppingBag.shoppingCart);
  const isRehydrated = useSelector((state) => state._persist?.rehydrated);

  const [checkout, setCheckout] = useState(false);
  const [newUserMobile, setNewUserMobile] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { first_name } = userInfo

  // Fetch locations when user is authenticated
  useEffect(() => {
    const fetchLocations = async () => {
      if (!userInfo?.token) {
        setCheckout(false);
        return;
      }

      setLoading(true); // Start loading
      try {
        console.log();
        
        const res = await commonService.getData("allLocation");
        if (res.length > 0) {
          dispatch(setLocations(res));
          setCheckout(true);
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
        setError("Failed to load locations. Please try again.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchLocations();
  }, [userInfo, dispatch]);

  // Redirect to home if shopping bag is empty after rehydration
  useEffect(() => {
    if (isRehydrated && (!shoppingBag || shoppingBag.length < 1)) {
      router.push("/");
    }
  }, [isRehydrated, shoppingBag, router]);

  return (
    <>
      {loading && <LodingComponent/>}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {!loading &&
        (checkout ? (
          <CheckOut newUserMobile={newUserMobile} />
        ) : (
          <CheckOutProcess setNewUserMobile={setNewUserMobile} setCheckout={setCheckout} />
        ))}
    </>
  );
}
