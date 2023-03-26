import React, { useEffect } from "react";
import Link from "next/link";
useRouter;
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";

const index = () => {
  const { token, logout, isAuthenticated } = useAuth();

  const router = useRouter();

  const logoutBtn = () => {
    logout();

    router.push("/login");
  };

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, []);

  return (
    <div>
      <h1>welcome to your profile {token}</h1>
      <Link href="/">Back to shop</Link>
      <button classame="btn btn-primary" onClick={() => logoutBtn()}>
        logout
      </button>
    </div>
  );
};

export default index;
