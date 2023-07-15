"use client";

import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

import Input from "../../components/input/Input";

interface InitialStateProps {
  name: string;
  email: string;
  password: string;
}

const initialState: InitialStateProps = {
  name: "",
  email: "",
  password: "",
};

const page = () => {
  const [state, setState] = useState(initialState);
  const router = useRouter();

  const handleChange = (e: any) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    axios
      .post("/api/register", state)
      .then(() => router.refresh())
      .then(() =>
        setTimeout(() => {
          router.push("/login");
        }, 2500)
      )
      .catch((err: any) => console.log(err));
  };

  return (
    <form onSubmit={onSubmit} className="text-center">
      <div className="flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2">
        <Input
          name="name"
          placeholder="Name"
          type={"text"}
          id="name"
          onChange={handleChange}
          value={state.name}
        />
        <Input
          name="email"
          placeholder="Email"
          type={"email"}
          id="email"
          onChange={handleChange}
          value={state.email}
        />
        <Input
          name="password"
          placeholder="Password"
          type={"password"}
          id="password"
          onChange={handleChange}
          value={state.password}
        />
        <button type="submit">Register</button>
      </div>

      <div>
        Do you have an account ? <Link href={"/login"}>Sign in</Link>
      </div>
    </form>
  );
};

export default page;
