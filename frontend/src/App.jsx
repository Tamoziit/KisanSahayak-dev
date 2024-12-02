import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import { fetchWeatherInfo } from "./utils/getLocationAndWeatherData";
import { useEffect } from "react";

import Login from "./pages/auth/Login";
import Home from "./pages/home/Home";
import Landing from "./pages/landing/Landing";
import SignUp from "./pages/auth/Signup";
import Upload from "./pages/upload/Upload";
import Capture from "./pages/upload/Capture";
import Dashboard from "./pages/dashboard/Dashboard";
import MarketPlace from "./pages/marketplace/Marketplace"
import MarketplaceSell from "./pages/marketplace/MarketplaceSell";
import MarketplaceBuy from "./pages/marketplace/MarketplaceBuy";
import MyListings from "./pages/marketplace/MyListings";
import Gratitude from "./pages/gratitude/Gratitude";
import Orders from "./pages/marketplace/Orders";
import History from "./pages/history/History";
import Records from "./pages/elevatedUser/records/Records";
import Update from "./pages/elevatedUser/update/Update";
import CompletePayment from "./pages/payment/CompletePayment";
import CancelPayment from "./pages/payment/CancelPayment";
import PersonalDashboard from "./pages/dashboard/PersonalDashboard";
import RegionalDashboard from "./pages/dashboard/RegionalDashboard";
import Profile from "./pages/profile/Profile";

function App() {
  const { authUser } = useAuthContext();
  console.log(authUser);

  const get = async () => {
    const data = await fetchWeatherInfo();
    console.log(data);
  }

  useEffect(() => {
    get();
  }, [])

  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={authUser ? <Navigate to={"/home"} /> : <Landing />} />
          <Route path="/login" element={authUser ? <Navigate to={"/home"} /> : <Login />} />
          <Route path="/signup" element={authUser ? <Navigate to={"/home"} /> : <SignUp />} />
          <Route path="/home" element={authUser ? <Home /> : <Navigate to={"/"} />} />
          <Route path="/capture" element={authUser ? <Capture /> : <Navigate to={"/"} />} />
          <Route path="/upload" element={authUser ? <Upload /> : <Navigate to={"/"} />} />
          <Route path="/dashboard" element={authUser ? <Dashboard /> : <Navigate to={"/"} />} />
          <Route path="/dashboard/personal" element={authUser ? <PersonalDashboard /> : <Navigate to={"/"} />} />
          <Route path="/dashboard/:district" element={authUser ? <RegionalDashboard /> : <Navigate to={"/"} />} />
          <Route path="/history" element={authUser ? <History /> : <Navigate to={"/"} />} />
          <Route path="/marketplace" element={authUser ? <MarketPlace /> : <Navigate to={"/"} />} />
          <Route path="/marketplace/sell" element={authUser ? <MarketplaceSell /> : <Navigate to={"/"} />} />
          <Route path="/marketplace/buy/:id" element={authUser ? <MarketplaceBuy /> : <Navigate to={"/"} />} exact />
          <Route path="/marketplace/my-listings" element={authUser ? <MyListings /> : <Navigate to={"/"} />} />
          <Route path="/marketplace/orders" element={authUser ? <Orders /> : <Navigate to={"/"} />} />
          <Route path="/complete-order" element={authUser ? <CompletePayment /> : <Navigate to={"/"} />} />
          <Route path="/cancel-order" element={authUser ? <CancelPayment /> : <Navigate to={"/"} />} />
          <Route path="/gratitude" element={authUser ? <Gratitude /> : <Navigate to={"/"} />} />
          <Route path="/elevated-user/records" element={authUser ? <Records /> : <Navigate to={"/"} />} />
          <Route path="/elevated-user/record/:id" element={authUser ? <Update /> : <Navigate to={"/"} />} />
          <Route path="/profile" element={authUser ? <Profile /> : <Navigate to={"/"} />} />
        </Routes>

        <Toaster />
      </div>
    </>
  )
}

export default App;
