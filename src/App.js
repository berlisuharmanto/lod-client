import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "react-auth-kit";
import ProtectedRoute from "./views/components/ProtectedRoute";
import Login from "./views/pages/login";
import Register from "./views/pages/register";
import Home from "./views/pages/home";
import Cart from "./views/pages/cart";
import Checkout from "./views/pages/checkout";
import CheckoutNotification from "./views/pages/checkoutNotification";
import NotFound from "./views/pages/Error/NotFound";
import './App.css';
import { ToastContainer } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          />
      <AuthProvider authType = {'cookie'}
                    authName={'_auth'}
                    cookieDomain={window.location.hostname}
                    cookieSecure={false}>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/" element={<ProtectedRoute>{<Home/>}</ProtectedRoute>}/>
          <Route path="/cart" element={<ProtectedRoute>{<Cart/>}</ProtectedRoute>}/>
          <Route path="/checkout" element={<ProtectedRoute>{<Checkout/>}</ProtectedRoute>}/>
          <Route path="/checkout-success" element={<ProtectedRoute>{<CheckoutNotification/>}</ProtectedRoute>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
