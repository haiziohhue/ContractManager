import { useEffect, useState } from "react";
import { getToken } from "./utils/token";
import { Login } from "./components/Login";
import { Upload } from "./components/Upload";
import { List } from "./components/List";
import "./style.css"
function App() {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    getToken() ? setIsLogin(true) : setIsLogin(false);
  },[]);
  if(isLogin){
    return <>
    <div className="AppContainer">
    <Upload/>
    <List/>
    </div>
    </>
  }else {
    return <Login set={setIsLogin}/>
  }
}

export default App;
