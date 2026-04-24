import React from "react";
import "./style.scss";
import { RouterProvider } from "react-router";
import router from "./app.routes";
import { AuthProvider } from "./features/auth/auth.context.jsx";
import { InterviewProvider } from "./features/Interview/Interview.context.jsx";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <AuthProvider>
        <InterviewProvider>
          <Toaster position="top-center" reverseOrder={false} />
          <RouterProvider router={router} />
        </InterviewProvider>
      </AuthProvider>
    </>
  );
}

export default App;
