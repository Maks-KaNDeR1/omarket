import "./scss/index.scss";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Cart from "./Components/Cart/Cart";
import ProfileIndex from "./Components/Profile/ProfileIndex";
import MyOrders from "./Components/Profile/Components/MyOrders";
import MyPatterns from "./Components/Profile/Components/MyPatterns";
import MyAdresses from "./Components/Profile/Components/MyAdresses";
import MyBankCards from "./Components/Profile/Components/MyBankCards";
import RequireAuth from "./hooks/RequireAuth";
import CanEditProfile from "./hooks/CanEditProfile";

const App: React.FC = () => {
  return (
    <Routes>
      <Route element={<RequireAuth />}>
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route element={<CanEditProfile />}>
          <Route path="/profile" element={<ProfileIndex />} >
            {/* @ts-ignore */}
            <Route path="myOrders" element={<MyOrders />} />
            <Route path="myPatterns" element={<MyPatterns />} />
            <Route path="myAdress" element={<MyAdresses />} />
            <Route path="myBankCards" element={<MyBankCards />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<Navigate to={"/home"} replace />} />
    </Routes >
  );
}

export default App;