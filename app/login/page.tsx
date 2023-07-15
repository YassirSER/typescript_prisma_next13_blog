"use client";

import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

import Input from "../../components/input/Input";

interface InitialStateProps {
  email: string;
  password: string;
}

const initialState: InitialStateProps = {
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

    signIn("credentials", {
      ...state,
      redirect: false,
    }).then((callback) => {
      if (callback?.ok) {
        router.refresh();
      }

      if (callback?.error) {
        throw new Error("Wrong Credentials");
      }
    });
    router.push("/");
  };

  return (
    <form onSubmit={onSubmit} className="text-center">
      <div className="flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2">
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
        <button type="submit">Login</button>
      </div>

      <div>
        Haven't got an account yet ? <Link href={"/register"}>Register</Link>
      </div>
    </form>
  );
};

export default page;
