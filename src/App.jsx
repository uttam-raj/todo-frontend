import { Route,Routes,Navigate } from 'react-router-dom';
import './App.css'
// import { TodoLogin } from './components/TodoLogin' ;
// import { TodoRegister } from './components/TodoRegister';
import { AuthWrapper } from './components/AuthWrapper';
import { Todo } from './components/Todo';
import {OtpVerify} from './components/OtpVerify';
import { useEffect, useState } from 'react';
import { Logout } from './components/Logout';
import { TodoForgotPassword } from './components/TodoForgotPassword';
import { TodoResetPassword } from './components/TodoResetPassword';
import { useAuth } from './Store/auth';

import Settings from './components/Settings';
function App() {
  const {token} = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  

  return (
    <>
     <Routes>
      {/* <Route  path='/' element={isAuthenticated? <Navigate to="/todo"/>: <TodoLogin onLogin={() => setIsAuthenticated(true)} />}/>
      <Route path='/register' element={<TodoRegister onRegister={() => setIsAuthenticated(true)}/>}/> */}
      <Route path="/" element={<AuthWrapper onLogin={() => setIsAuthenticated(true)}  onRegister={() => setIsAuthenticated(true)}/>} />
      <Route path='/verify-otp' element={<OtpVerify onVerified={() => setIsAuthenticated(true)} />} />
      <Route path='/todo' element={isAuthenticated?<Todo />:<Navigate to="/"/>}/>
      <Route path='/logout' element={<Logout onLogout={()=>setIsAuthenticated(false)}/>}></Route>
      <Route path='/forgot' element={<TodoForgotPassword onResetPassword={()=>setIsAuthenticated(false)}/>}/>
      <Route path='/reset-password' element={<TodoResetPassword/>}/>
      <Route path='/settings' element={isAuthenticated?<Settings/>:<Navigate to="/"/>}></Route>
     </Routes>
    </>
  )
}

export default App
