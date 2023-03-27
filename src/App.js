import { Route, Routes } from 'react-router-dom';

import './App.css';
import Home from './Pages/Home';
import LoginPage from './Pages/Login';
import SignupPage from './Pages/Signup';
import Create from './Components/Create/Create';
import UserProvider from './store/User/UserProvider';
import AuthProvider from './store/Auth/AuthProvider';
import PublicRoutes from './utils/PublicRoutes';
import ProtectedRoutes from './utils/ProtectedRoutes';
import PostProvider from './store/Post/PostProvider';
import ViewPost from './Pages/ViewPost';




function App() {
  return (
     <div>
      <UserProvider>
        <AuthProvider>
          <PostProvider>
            <Routes>
              <Route path='/' element={<Home></Home>}></Route>
              <Route path='/post/:id' element = {<ViewPost></ViewPost>}></Route>
              <Route element={<PublicRoutes></PublicRoutes>}>
                  <Route path = '/signup' element={<SignupPage></SignupPage>}></Route>
                  <Route path = '/signin' element={<LoginPage></LoginPage>}></Route>
              </Route>  
              <Route element={<ProtectedRoutes></ProtectedRoutes>}>
                  <Route path='/sell' element={<Create></Create>}></Route>
              </Route>
            </Routes>
          </PostProvider>
        </AuthProvider>
      </UserProvider>
     </div>
  );
}

export default App;
