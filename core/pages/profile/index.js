import React from "react";
import { useRouter } from "next/router";
import ProfileLayout from "@/layouts/ProfileLayout";
import { API_URL } from "@/config/urls";
import Link from "next/link";
import cookie from "js-cookie";

const Index = ({ user }) => {
  const router = useRouter();

  const deleteAccount = async () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this account?"
    );

    if (confirmDelete) {
      const req = await fetch(`${API_URL}/user/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${cookie.get("authToken")}`,
        },
      });
      if (req.ok) {
        cookie.remove("authToken");
        router.push("/");
      }
    }
  };
  return (
    <ProfileLayout>
      <div class="row">
        <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
          <div class="card">
            <div class="card-body">
              <div class="d-inline-block">
                <h4 class="text-muted">FirstName</h4>
                <h6 class="mb-0">{user.first_name}</h6>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
          <div class="card">
            <div class="card-body">
              <div class="d-inline-block">
                <h4 class="text-muted">LastName</h4>
                <h6 class="mb-0">{user.last_name}</h6>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
          <div class="card">
            <div class="card-body">
              <div class="d-inline-block">
                <h4 class="text-muted">Username</h4>
                <h6 class="mb-0">{user.username}</h6>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
          <div class="card">
            <div class="card-body">
              <div class="d-inline-block">
                <h4 class="text-muted">Email Address</h4>
                <h6 class="mb-0">{user.email}</h6>
              </div>
            </div>
          </div>
        </div>
        <div class="page-breadcrumb">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <Link href="/profile/edit" class="breadcrumb-link">
                  Edit Profile
                </Link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                <Link href="#" class="breadcrumb-link" onClick={deleteAccount}>
                  Delete Account
                </Link>
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </ProfileLayout>
  );
};

export async function getServerSideProps(context) {
  const res = await fetch(`${API_URL}/user/`, {
    headers: {
      Authorization: `Bearer ${context.req.cookies["authToken"]}`,
    },
  });
  const data = await res.json();

  return {
    props: {
      user: data,
    },
  };
}

export default Index;
