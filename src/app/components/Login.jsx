import React from "react";
import { connect } from "react-redux";

const Login = () => <div>Login here!!!</div>;

const mapStateToPropos = (state) => state;

export const ConnectedLogin = connect(mapStateToPropos)(Login);
