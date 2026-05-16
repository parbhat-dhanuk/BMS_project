import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import Spinner from "../component/common/Spinner";

const Home = lazy(() => import("../pages/Home"));
const LoginForm = lazy(() => import("../pages/auth/LoginForm"));
const RegistrationForm = lazy(() => import("../pages/auth/RegistrationForm"));
const AddBlog = lazy(() => import("../pages/AddBlog"));
const EditBlog = lazy(() => import("../pages/EditBlog"));
const About = lazy(() => import("../pages/About"));
const BlogDetails = lazy(() => import("../pages/BlogDetails"));
const BlogsList = lazy(() => import("../pages/BlogsList"));
const MyBlogs = lazy(() => import("../pages/MyBlogs"));
const NotFound = lazy(() => import("../pages/NotFound"));

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/about" element={<About />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/blogs/all" element={<BlogsList />} />
              <Route path="/blog/add" element={<AddBlog />} />
              <Route path="/blog/edit/:id" element={<EditBlog />} />
              <Route path="/blog/:id" element={<BlogDetails />} />
              <Route path="/myblogs" element={<MyBlogs />} />
              {/* <Route path="/myblogs" element={<MyBlog />} /> */}
            </Route>
          </Route>
          {/* 404 route (must be last) */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;
