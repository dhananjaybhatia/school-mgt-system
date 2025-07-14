"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoginPage = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    const role = user?.publicMetadata.role;

    if (    
      role === "admin" ||
      role === "teacher" ||
      role === "student" ||
      role === "parent"
    ) {
      router.push(`/${role}`);
    }
  }, [router, user]);

  return (
    <div className="h-screen flex items-center justify-center bg-blue-100 px-4">
      <SignIn.Root>
        <SignIn.Step
          name="start"
          className="w-full max-w-sm bg-white px-8 py-10 rounded-lg shadow-lg flex flex-col gap-4"
        >
          <div className="flex items-center gap-2 mb-2 justify-center">
            <Image src="/logo.png" alt="Logo" width={28} height={28} />
            <h1 className="text-2xl font-semibold text-gray-800">
              LearnIQ Academy
            </h1>
          </div>
          <h2 className="text-sm text-gray-500 mb-4 text-center">
            Sign in to your account
          </h2>

          <Clerk.GlobalError className="text-red-500 text-sm" />

          <Clerk.Field name="identifier" className="flex flex-col gap-1">
            <Clerk.Label className="text-sm text-gray-600">
              Username
            </Clerk.Label>
            <Clerk.Input
              type="text"
              required
              className="p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <Clerk.FieldError className="text-red-500 text-xs" />
          </Clerk.Field>

          <Clerk.Field name="password" className="flex flex-col gap-1">
            <Clerk.Label className="text-sm text-gray-600">
              Password
            </Clerk.Label>
            <Clerk.Input
              type="password"
              required
              className="p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <Clerk.FieldError className="text-red-500 text-xs" />
          </Clerk.Field>

          <SignIn.Action
            submit
            className="mt-4 bg-blue-600 hover:bg-blue-700 transition-colors duration-200 text-white text-sm font-medium py-2 rounded-md"
          >
            Sign In
          </SignIn.Action>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  );
};

export default LoginPage;
