import { FormEvent, useState } from "react";
import { login } from "../api/axios";
import { setToken } from "../utils/token";

export const Login = ({ set }:{set:React.Dispatch<React.SetStateAction<boolean>>}) => {
  const [password, setPassword] = useState("");
  const handlePasswordChange = (e:any) => {
    setPassword(e.target.value);
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    login(password)
      .then((res) => {
        if (res.data.code !== 0) throw new Error("登录失败");
        setToken(res.data.data.token);
        alert("登录成功");
        set(true);
      })
      .catch(() => {
        alert("登录失败");
      });
  };
  return (
    <>
      <form onSubmit={submit}>
        <input
          type="password"
          placeholder="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit">提交</button>
      </form>
    </>
  );
};
