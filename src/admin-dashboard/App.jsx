// admin-dashboard/App.jsx
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/users/Users";
import Posts from "./pages/posts/Posts";
import Category from "./pages/category/Category";
import SubCategory from "./pages/subcategory/SubCategory";
import Ads from "./pages/ads/Ads";
import Gallery from "./pages/gallery/Gallery";
import Pages from "./pages/Pages";
import Slider from "./pages/slider/Slider";
import Profile from "./pages/users/Profile";
import AdsAdd from "./pages/ads/AdsAdd";
import PostsAdd from "./pages/posts/PostsAdd";
import PostEdit from "./pages/posts/PostEdit";
import CategoryList from "./pages/category/CategoryList";
import CategoryEdit from "./pages/category/CategoryEdit";
import AdsEdit from "./pages/ads/AdsEdit";
import SliderAdd from "./pages/slider/SliderAdd";
import SliderEdit from "./pages/slider/SliderEdit";
import UsersAdd from "./pages/users/UsersAdd";
import UsersEdit from "./pages/users/UsersEdit";
import SubcategoryAdd from "./pages/subcategory/SubcategoryAdd";
import SubcategoryEdit from "./pages/subcategory/SubcategoryEdit";
import GalleryAdd from "./pages/gallery/GalleryAdd";
import GalleryEdit from "./pages/gallery/GalleryEdit";
import PageAdd from "./pages/PageAdd";
import PageEdit from "./pages/PageEdit";



const AdminApp = () => {
  return (
    <Layout>
      <Routes>
        {/* pages */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/pages" element={<Pages />} />
        <Route path="/pages/add" element={<PageAdd />} />
        <Route path="/pages/edit/:id" element={<PageEdit/>} />
        {/* users */}
        <Route path="/users" element={<Users />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/users/add" element={<UsersAdd />} />
        <Route path="/users/edit/:id" element={<UsersEdit />} />
        {/* SubCategory */}
        <Route path="/subcategory/list" element={<SubCategory />} />
        <Route path="/subcategory/add" element={<SubcategoryAdd />} />
        <Route path="/subcategory/edit/:id" element={<SubcategoryEdit />} />
        {/* Gallery */}
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/gallery/add" element={<GalleryAdd />} />
        <Route path="/gallery/edit/:id" element={<GalleryEdit />} />
        {/* slider */}
        <Route path="/slider" element={<Slider />} />
        <Route path="/slider/add" element={<SliderAdd />} />
        <Route path="/slider/edit/:id" element={<SliderEdit />} />
        {/* ads */}
        <Route path="/ads" element={<Ads />} />
        <Route path="/ads/add" element={<AdsAdd />} />
        <Route path="/ads/edit/:id" element={<AdsEdit />} />
        {/* posts */}
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/add" element={<PostsAdd />} />
        <Route path="/posts/edit/:id" element={<PostEdit />} />
        {/* category */}
        <Route path="/category/add" element={<Category />} />
        <Route path="/category/list" element={<CategoryList />} />
        <Route path="/category/edit/:id" element={<CategoryEdit />} />
      </Routes>
    </Layout>
  );
};

export default AdminApp;