import { Card, Container } from "react-bootstrap";

import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

import { RouterService } from "../services";

import { getAuth } from "../store/slices/authSlice";
import Clock from "./Clock";

const greetingMsg = ["Welcome", "Hi", "Namaste", "Howdy"];

const Hero = () => {
  const navigate = useNavigate();

  const isUserLogged = useAuth();

  const userDetails = useSelector(getAuth);

  const greetNumber =
    Math.ceil(Math.abs(Math.random() * greetingMsg.length)) - 1;

  return (
    <div className="py-5">
      <Container className="d-flex justify-content-center">
        <Card className="py-5 d-flex flex-column align-items-center card bg-light w-75">
          <h2 className="text-center mb-2 text-opacity-75 text-black">
            JWT AUTH
          </h2>
          <div className="card-body">
            <p className="text-center text-black-50">
              <strong>
                {greetingMsg[greetNumber]}
                {isUserLogged ? (
                  " " + userDetails.name + " Hope, You are Doing Fine"
                ) : (
                  <> User,Please Login First </>
                )}
              </strong>
              <span className="ms-3">
                <Clock />
              </span>
            </p>
          </div>
          {!isUserLogged ? (
            <>
              {" "}
              {/* Action Button */}
              <div>
                <button
                  className="btn btn-primary me-3"
                  type="button"
                  onClick={() => RouterService.navigate(navigate, "/login")}
                >
                  Sign In
                </button>
                <button
                  className="btn btn-secondary me-3"
                  type="button"
                  onClick={() => RouterService.navigate(navigate, "/register")}
                >
                  Sign Up
                </button>
              </div>
            </>
          ) : null}
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
