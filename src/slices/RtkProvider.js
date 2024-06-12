"use client";
import { Provider } from "react-redux";
import React from "react";
import store from "./store";

function RTKProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

export default RTKProvider;