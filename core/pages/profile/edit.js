import React, { useState } from "react";
import Link from "next/link";
import { API_URL } from "@/config/urls";
import ProfileLayout from "@/layouts/ProfileLayout";
import cookie from "js-cookie";
import { useRouter } from "next/router";

const EditUser = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");

  //   error and loading
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  //   router
  const router = useRouter();

  const submitBtn = async (e) => {
    e.preventDefault();
    setLoading(true);

    const req = await fetch(`${API_URL}/user/`, {
      method: "PUT",
      body: JSON.stringify({ username, firstname, lastname, email }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie.get("authToken")}`,
      },
    });

    const res = await req.json();

    if (req.ok) {
      setLoading(false);
      setError(null);
      router.push("/profile");
    } else {
      setLoading(false);
      setError(res.username || res.email || res.error || "An Error Occured");
    }
  };

  return (
    <ProfileLayout>
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

      <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="card">
            <h5 class="card-header">Edit Profile</h5>
            <div class="card-body">
              {error && (
                <div>
                  <h3 class="text-danger">{error}</h3>
                </div>
              )}
              <form
                id="validationform"
                data-parsley-validate=""
                novalidate=""
                onSubmit={(e) => submitBtn(e)}
              >
                <div class="form-group row">
                  <label class="col-12 col-sm-3 col-form-label text-sm-right">
                    FirstName
                  </label>
                  <div class="col-12 col-sm-8 col-lg-6">
                    <input
                      type="text"
                      value={firstname}
                      class="form-control"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-12 col-sm-3 col-form-label text-sm-right">
                    LastName
                  </label>
                  <div class="col-12 col-sm-8 col-lg-6">
                    <input
                      type="text"
                      value={lastname}
                      class="form-control"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-12 col-sm-3 col-form-label text-sm-right">
                    UserName
                  </label>
                  <div class="col-12 col-sm-8 col-lg-6">
                    <input
                      type="text"
                      class="form-control"
                      value={username}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-12 col-sm-3 col-form-label text-sm-right">
                    Email Address
                  </label>
                  <div class="col-12 col-sm-8 col-lg-6">
                    <input
                      type="email"
                      value={email}
                      class="form-control"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div class="form-group row text-right">
                  <div class="col col-sm-10 col-lg-9 offset-sm-1 offset-lg-0">
                    <button type="submit" class="btn btn-space btn-primary">
                      Submit
                    </button>
                    <Link href="/profile" class="btn btn-space btn-secondary">
                      Cancel
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
};

// export async function getServerSideProps(context) {
//   const res = await fetch(`${API_URL}/user/`, {
//     headers: {
//       Authorization: `Bearer ${context.req.cookies["authToken"]}`,
//     },
//   });
//   const data = await res.json();

//   return {
//     props: {
//       user: data,
//     },
//   };
// }

export default EditUser;
