import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Footerr from './components/Footer/Footerr';
import Header from './components/header/Header';
import AdminDashboard from './pages/admin/AdminDashboard';
import CategoryTable from './pages/admin/CategoryTable';
import CommentTable from './pages/admin/CommentTable';
import PostsTable from './pages/admin/PostsTable';
import UsersTable from './pages/admin/UsersTable';
import Login from './pages/auth/login/Login';
import Register from './pages/auth/register/Register';
import Category from './pages/category/Category';
import Create from './pages/create/Create';
import Home from './pages/home/Home';
import NotFound from './pages/notFound/NotFound';
import PostDetails from './pages/postDetails/PostDetails';
import Posts from './pages/posts/Posts';
import Profile from './pages/profile/Profile';
import VerifyEmail from './pages/verify-email/VerifyEmail';

function App() {
  const {user} = useSelector((state)=>state.auth)
  return (
    <div className="App">
      <ToastContainer theme='colored' position='top-center' />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />

          <Route path='posts'>
            <Route index element={<Posts />} />
            <Route path='details/:id' element={<PostDetails />} />
            <Route path='categories/:category' element={<Category />} />
            <Route path='create' element={user ? <Create /> : <Navigate to="/"/>} />
          </Route>
          <Route path='/profile/:id' element={<Profile />} />

          <Route path='admin-dashboard'>
            <Route index element={user?.isAdmin ? <AdminDashboard />: <Navigate to="/"/>} />
            <Route path='users-table' element={user?.isAdmin ?<UsersTable />: <Navigate to="/"/> } />
            <Route path='posts-table' element={user?.isAdmin ?<PostsTable />: <Navigate to="/"/>} />
            <Route path='categories-table' element={user?.isAdmin ?<CategoryTable />: <Navigate to="/"/>} />
            <Route path='comments-table' element={user?.isAdmin ?<CommentTable />: <Navigate to="/"/>} />
          </Route>


          <Route path='/login' element={!user ? <Login /> : <Navigate to="/"/>} />
          <Route path='/register' element={!user ? <Register />: <Navigate to="/"/>} />
          <Route path='/users/:userId/verify/:token' element={!user ? <VerifyEmail />: <Navigate to="/"/>} />
          <Route path='*' element={<NotFound/>}/>
        </Routes>
        <Footerr />
      </BrowserRouter>
    </div>
  );
}

export default App;
