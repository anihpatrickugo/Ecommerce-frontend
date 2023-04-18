import React, { useState, useLayoutEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import cookie from "js-cookie";
import { API_URL } from "@/config/urls";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";

const Signup = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const router = useRouter();
  const { token, setUserAuthInfo, loading, setLoading } = useAuth();

  const signupBtn = async (e) => {
    e.preventDefault();
    setLoading(true);
    const rawData = { username, email, password };

    const req = await fetch(`${API_URL}/user/`, {
      method: "POST",
      body: JSON.stringify(rawData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await req.json();

    if (req.ok) {
      setError(null);

      // log user in
      const loginReq = await fetch(`${API_URL}/auth/`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const loginRes = await loginReq.json();
      setUserAuthInfo(loginRes.access);
      setLoading(false);
      router.push("/profile");
    } else {
      setLoading(false);
      setError(res.username || res.email || res.message || res.errors);
    }
  };

  return (
    // <!-- Section: Design Block -->
    <section class="">
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

      {/* <!-- Jumbotron --> */}
      <div
        class="px-4 py-5 px-md-5 text-center text-lg-start"
        style={{ backgroundColor: "hsl(0, 0%, 96%)" }}
      >
        <div class="container">
          <div class="row gx-lg-5 align-items-center">
            <div class="col-lg-6 mb-5 mb-lg-0">
              {/* <h1 class="my-5 display-3 fw-bold ls-tight">
                The best offer <br />
                <span class="text-primary">for your business</span>
              </h1> */}
              <Image
                src="/logo.svg"
                alt="login form"
                class="img-fluid centre"
                style={{
                  borderRadius: "1rem 0 0 1rem",
                  height: "auto",
                  width: "auto",
                }}
                width={100}
                height={100}
              />
              <p style={{ color: "hsl(217, 10%, 50.8%)" }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eveniet, itaque accusantium odio, soluta, corrupti aliquam
                quibusdam tempora at cupiditate quis eum maiores libero
                veritatis? Dicta facilis sint aliquid ipsum atque?
              </p>
            </div>

            <div class="col-lg-6 mb-5 mb-lg-0">
              <div class="card">
                <div class="card-body py-5 px-md-5">
                  {error && <p class="mb-5 link-danger">{error}</p>}

                  <form>
                    {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
                    <div class="row">
                      <div class="col-md-12 mb-4">
                        <div class="form-outline">
                          <input
                            type="text"
                            id="form3Example1"
                            class="form-control"
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                          />
                          <label class="form-label" for="form3Example1">
                            Username
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* <!-- Email input --> */}
                    <div class="form-outline mb-4">
                      <input
                        type="email"
                        id="form3Example3"
                        class="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <label class="form-label" for="form3Example3">
                        Email address
                      </label>
                    </div>

                    {/* <!-- Password input --> */}
                    <div class="form-outline mb-4">
                      <input
                        type="password"
                        id="form3Example4"
                        class="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <label class="form-label" for="form3Example4">
                        Password
                      </label>
                    </div>

                    {/* <!-- Submit button --> */}
                    <button
                      onClick={(e) => signupBtn(e)}
                      type="submit"
                      class="btn btn-primary btn-block mb-4"
                    >
                      Sign up
                    </button>
                    <p class="small fw-bold mt-2 pt-1 mb-0">
                      Already have an account?{" "}
                      <Link href="/login" class="link-success">
                        Sign In
                      </Link>
                    </p>

                    {/* <div class="text-center">
                        
                      <p>or sign up with:</p>
                      <button
                        type="button"
                        class="btn btn-link btn-floating mx-1"
                      >
                        <i class="fab fa-facebook-f"></i>
                      </button>

                      <button
                        type="button"
                        class="btn btn-link btn-floating mx-1"
                      >
                        <i class="fab fa-google"></i>
                      </button>

                      <button
                        type="button"
                        class="btn btn-link btn-floating mx-1"
                      >
                        <i class="fab fa-twitter"></i>
                      </button>

                      <button
                        type="button"
                        class="btn btn-link btn-floating mx-1"
                      >
                        <i class="fab fa-github"></i>
                      </button>
                    </div>  */}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Jumbotron --> */}
    </section>
    // <!-- Section: Design Block -->
  );
};

export default Signup;
