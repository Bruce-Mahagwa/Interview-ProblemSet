"use client"
import axios from "axios"
import { redirect } from "next/navigation";
import { useState } from "react";

axios.defaults.baseURL = "http://localhost:4000";

export default function Home() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  async function signin(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget);
    console.log(email, password)
    const res = await axios.post("/auth/login", {
      email: email,
      password: password
    });
    console.log(res, "red")
    if (res.data.payload.length > 0) {
      redirect("/home")
    }
    else {
      return;
    }
  }
  return (
    <div className = "flex justify-center pt-[100px]">
      <form onSubmit={(e) => signin(e)} className = "flex flex-col gap-[20px]">
        <div className = "flex flex-col gap-[20px]">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="Email" className = "p-[10px] w-[300px] border-2 border-black"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className = "flex flex-col gap-[20px]">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" className = "p-[10px] w-[300px] border-2 border-black" 
            onChange={(e) => setPassword(e.target.value)}
        
          />
        </div>
        <button type="submit" className = "cursor-pointer w-[150px] bg-green">
          Sign In
        </button>
      </form>
    </div>
  );
}
