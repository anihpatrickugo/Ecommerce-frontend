import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Country, State, City } from "country-state-city";
import { API_URL } from "@/config/urls";
import { useAuth } from "@/contexts/AuthContext";
import cookie from "js-cookie";
import PhoneInput from "react-phone-number-input/input";

const ShippingAddress = ({ cart }) => {
  const allCountries = Country.getAllCountries();
  const allStates = State.getAllStates();
  const allCities = City.getAllCities();

  // loading
  const { loading, setLoading } = useAuth();

  //   router settings
  const router = useRouter();

  //   form data
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [district, setDistrict] = useState("");
  const [zip, setZip] = useState("");

  const [countryName, seCountryName] = useState(null);

  // selected data related objects
  const [states, setStates] = useState([]);

  //   error state
  const [error, setError] = useState(null);

  const changeCountry = (event) => {
    event.preventDefault();

    const currentCountry = allCountries.find(
      (country) => country.name === event.target.value
    );

    setCountry(currentCountry.isoCode);
    seCountryName(currentCountry.name);

    // sort the states in ascending order
    const chosenStates = allStates.filter(
      (state) => state.countryCode === currentCountry.isoCode
    );
    const sortedStates = chosenStates.sort(function (a, b) {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });

    setStates(sortedStates);
  };

  const submitAddress = async (e) => {
    setLoading(true);
    e.preventDefault();

    const rawData = { country, state, city, phone, district, zip };

    const req = await fetch(`${API_URL}/checkout/${cart.id}/`, {
      method: "POST",
      body: JSON.stringify(rawData),

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie.get("authToken")}`,
      },
    });

    const res = await req.json();

    if (req.ok) {
      setLoading(false);
      location.assign(`${API_URL}/create-checkout-session?cartid=${res.id}`);
    } else {
      setLoading(false);
      setError("An error occured, unable to process data");
    }
    // console.log(rawData);
  };

  return (
    <div class="container py-5">
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
      <div class="row d-flex justify-content-center align-items-center">
        <div class="col">
          <div class="card my-4 shadow-3">
            <div class="row g-0">
              <div class="col-xl-6">
                <div class="card-body p-md-5 text-black">
                  <h3 class="mb-4 text-uppercase">Delivery Info</h3>
                  {error && <p class="mb-5 link-danger">{error}</p>}

                  <div class="row">
                    <div class="col-md-6 mb-4 ">
                      <select
                        class="select form-control form-control-lg"
                        value={countryName}
                        onChange={changeCountry}
                      >
                        <option>Select Country</option>
                        {allCountries.map((ctr) => (
                          <option key={ctr.name} value={ctr.name}>
                            {ctr.name}
                          </option>
                        ))}
                      </select>
                      <label class="form-label" htmlFor="form3Example8">
                        Country
                      </label>
                    </div>

                    <div class="col-md-6 mb-4">
                      <select
                        class="select form-control form-control-lg"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                      >
                        <option>Select State</option>
                        {states.map((state) => (
                          <option key={state.name} value={state.name}>
                            {state.name}
                          </option>
                        ))}
                      </select>
                      <label class="form-label" htmlFor="form3Example8">
                        State
                      </label>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6 mb-4 mb-4">
                      <input
                        type="text"
                        id="form3Example3"
                        class="form-control form-control-lg"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                      <label class="form-label" htmlFor="form3Example3">
                        City
                      </label>
                    </div>
                    <div class="col-md-6 mb-4 mb-4">
                      <PhoneInput
                        class="form-control form-control-lg"
                        country={country}
                        value={phone}
                        onChange={setPhone}
                      />
                      <label class="form-label" htmlFor="form3Example3">
                        Phone
                      </label>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6 mb-4">
                      <input
                        type="text"
                        id="form3Example3"
                        class="form-control form-control-lg"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                      />
                      <label class="form-label" htmlFor="form3Example3">
                        Line Address
                      </label>
                    </div>
                    <div class="col-md-6 mb-4">
                      <input
                        type="text"
                        id="form3Example3"
                        class="form-control form-control-lg"
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                      />
                      <label class="form-label" htmlFor="form3Example3">
                        Zip Code
                      </label>
                    </div>
                  </div>

                  <div class="col">
                    <div class="d-flex justify-content-center">
                      <button
                        type="button"
                        class="btn btn-success btn-lg ms-2"
                        style={{ backgroundColor: "hsl(210, 100%, 50%)" }}
                        onClick={submitAddress}
                      >
                        Place order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params, req }) => {
  const res = await fetch(`${API_URL}/cart/`, {
    headers: {
      Authorization: `Bearer ${req.cookies["authToken"]}`,
    },
  });
  const data = await res.json();

  return {
    props: {
      cart: data,
    },
  };
};

export default ShippingAddress;
