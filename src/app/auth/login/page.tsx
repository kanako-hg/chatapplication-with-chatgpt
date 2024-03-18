"use client";

import { auth } from "@/app/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        router.push("/");
      })
      .catch((error) => {
        if (error.code === "auth/invalid-credential") {
          alert("そのようなユーザーは存在しません。");
        } else {
          alert(error.message);
        }
      });
  };

  return (
    <div className="h-screen flex flex-col items-col items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h1 className="mb-4 text-2xl text-gray-700 font-medium">ログイン</h1>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            {...register("email", {
              required: "メールアドレスは必須です。",
              pattern: {
                value:
                  /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
                message: "不適切なメールアドレスです。",
              },
            })}
            type="text"
            className="mt-1 border-2 rounded-md w-full p-2"
          />
          {errors.email && (
            <span className="text-red-600">{errors.email.message}</span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            {...register("password", {
              required: "パスワードは必須です。",
              minLength: {
                value: 6,
                message: "6文字以上で入力してください。",
              },
            })}
            type="password"
            className="mt-1 border-2 rounded-md w-full p-2"
          />
          {errors.password && (
            <span className="text-red-600">{errors.password.message}</span>
          )}
        </div>
        <div className="flex justify-end">
          <button className="bg-green-500 text-white font-bold py-2 px-4 mt-3 rounded hover:bg-green-700">
            ログイン
          </button>
        </div>
        <div className="mt-3">
          <span className="text-gray-600 text-sm">初めてのご利用ですか?</span>
          <Link
            href={"/auth/register"}
            className="text-green-500 text-sm font-bold ml-2 hover:text-green-700"
          >
            新規登録ページへ
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
