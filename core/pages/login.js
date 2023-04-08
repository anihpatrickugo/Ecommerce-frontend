import React, { useState, useLayoutEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { API_URL } from "@/config/urls";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const router = useRouter();
  const callbackUrl = router.query?.callbackUrl ?? "/profile/";

  const { setUserAuthInfo, loading, setLoading } = useAuth();

  const loginBtn = async (e) => {
    e.preventDefault();
    setLoading(true);

    const rawData = { username, password };

    const req = await fetch(`${API_URL}/auth/`, {
      method: "POST",
      body: JSON.stringify(rawData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await req.json();

    if (req.ok) {
      setUserAuthInfo(res.access);
      setLoading(false);
      setError(null);
      router.push(callbackUrl);
    } else {
      setLoading(false);
      setError(res.error || res.message || res.errors || "Invalid credentials");
    }
  };

  return (
    <section class="vh-100" style={{ backgroundColor: "hsl(0, 0%, 96%)" }}>
      {/* start preloader */}
      {loading && (
        <div class="preloader">
          <div class="preloader-inner">
            <div class="preloader-icon">
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      )}
      {/* end preloader */}
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card shadow-2-strong" style={{ borderRadius: "1rem" }}>
              <div class="card-body p-5 text-center">
                <Image
                  src="/logo.svg"
                  alt="login form"
                  class="img-fluid"
                  style={{ borderRadius: "1rem 0 0 1rem" }}
                  width={100}
                  height={80}
                />
                <h3 class="mb-5">Sign in</h3>
                {error && <p class="mb-5 link-danger">{error}</p>}

                <div class="form-outline mb-4">
                  <input
                    type="text"
                    id="typeEmailX-2"
                    class="form-control form-control-lg"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <label class="form-label" for="typeEmailX-2">
                    Username
                  </label>
                </div>

                <div class="form-outline mb-4">
                  <input
                    type="password"
                    id="typePasswordX-2"
                    class="form-control form-control-lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label class="form-label" for="typePasswordX-2">
                    Password
                  </label>
                </div>

                <button
                  class="btn btn-primary btn-lg btn-block"
                  type="submit"
                  onClick={(e) => loginBtn(e)}
                >
                  Login
                </button>
                <p class="small fw-bold mt-2 pt-1 mb-0">
                  Dont have an account ?
                  <Link href="/signup" class="link-success">
                    Sign Up
                  </Link>
                </p>

                {/* <hr class="my-4" />

                <button
                  class="btn btn-lg btn-block btn-primary"
                  style={{ backgroundColor: "#dd4b39" }}
                  type="submit"
                >
                  <i class="fab fa-google me-2"></i> Sign in with google
                </button>
                <button
                  class="btn btn-lg btn-block btn-primary mb-2"
                  style={{ backgroundColor: "#3b5998" }}
                  type="submit"
                >
                  <i class="fab fa-facebook-f me-2"></i>Sign in with facebook
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
