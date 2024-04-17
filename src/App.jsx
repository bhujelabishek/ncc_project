import './App.css'
import Header from './Header.jsx'
import Todolist from './components/Todolist.jsx';
import TodoCreate from './components/TodoCreate.jsx';
import SignInform from './components/SignInForm.jsx';
import { Routes,Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from './contexts/authContext.jsx';
import { PrivateRoute } from './routes/PrivateRoute.jsx';
function App() {
    return (
    <>
    <AuthProvider>
    <Routes>
    {/* <Route path='*' element={} ></Route> */}
    <Route path='/signin' element={<SignInform/>}></Route>

      <Route element={<PrivateRoute/>}>
      <Route path='/todo' element={<TodoCreate/>}></Route>
      <Route path='/todos' element={<Todolist/>} ></Route>
      <Route path='*' element={<Todolist/>}></Route>
      </Route>
    </Routes>
  
    {/* <Header/>1
    <Todolist/>
    <TodoCreate/> */}
    <ToastContainer/>
    </AuthProvider>

    </>
  );
}

export default App
