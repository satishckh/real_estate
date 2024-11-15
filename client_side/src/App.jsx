import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import React, { Suspense, lazy } from 'react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Breadcrumb from './components/Breadcrumb';
import ProtectedRoute from './routes/ProtectedRoute';
import LoadingAnimation from './common/LoadingAnimation';
import ChatContainer from './whatsApp/ChatContainer';
import HomeNavbar from './homeUI/HomeNavbar';
import Home2 from './homeUI/home2/Home2';
import Home3 from './homeUI/home3/Home3';



const SignIn = lazy(() => import('./features/auth/SignIn/SignIn'));
const PasswordResetEmail = lazy(() => import('./features/auth/PasswordResetEmail/PasswordResetEmail'));
const UserProfile = lazy(() => import('./features/user/components/UserProfile'));
const AdminProfile = lazy(() => import('./features/admin/AdminProfile'));
const PasswordUpdate = lazy(() => import('./features/auth/PasswordUpdate/PasswordUpdate'));
const AllCustomerDetails = lazy(() => import('./features/user/components/AllCustomerDetails'));
const InactiveCustomers = lazy(() => import('./features/user/components/InactiveCustomers'));
const UserUpdateForm = lazy(() => import('./features/user/components/UserUpdateForm'));
const AddCustomerForm = lazy(() => import('./features/user/components/AddCustomerForm'));
const Home1 = lazy(() => import('./homeUI/Home1'));
// const Home2 = lazy(() => import('./homeUI/home2/Home2'));
// const Home2 = React.lazy(() => import('./homeUI/home2/Home2'));

const AddProperty = lazy(() => import('./features/admin/AddProperty'));
const  ReviewsCard  = lazy(() => import('./features/reviews/ReviewsCard'));
const CustomerReviews = lazy(() => import('./features/reviews/CustomerReviews'));

function App() {
  const location = useLocation();
  const hideFooterRoutes = ['/chats',]; // Paths where the footer should be hidden

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <MainContent />
      {!hideFooterRoutes.includes(location.pathname) && <Footer />} {/* Conditionally render Footer */}
      <Toaster />
    </div>
  );
}

function MainContent() {
  const location = useLocation();
  const noBreadcrumbRoutes = ['/', '/reset-password','/chats','/home1', '/home2', '/home3'];

  return (
    <>
   
    <main className="flex-grow">
      <div className="mx-auto max-w-md flex items-center justify-center">
        {!noBreadcrumbRoutes.includes(location.pathname) && <Breadcrumb />}
      </div>
      <Suspense fallback={<LoadingAnimation />}>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/reset-password" element={<PasswordResetEmail />} />
          <Route path="/chats" element={<ChatContainer />} />
          <Route path="/home-ui-navbar" element={<HomeNavbar />} />
          <Route path="/home1" element={<Home1 />} />
          <Route path="/home2" element={<Home2 />} />
          <Route path="/home3" element={<Home3 />} />
          <Route
            path="/admin-profile"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <AdminProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-customer"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <AddCustomerForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/view-customers"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <AllCustomerDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update-user/:id"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <UserUpdateForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inactive-customers"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <InactiveCustomers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update-password"
            element={
              <ProtectedRoute>
                <PasswordUpdate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/property-type"
            element={
              <ProtectedRoute>
                <AddProperty />
              </ProtectedRoute>
            }
          />
          <Route
            path="/review"
            element={
              <ProtectedRoute>
                 <ReviewsCard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer-reviews"
            element={
              <ProtectedRoute>
                 <CustomerReviews />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </main>
    </>
  );
  
}

function Root() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default Root;
