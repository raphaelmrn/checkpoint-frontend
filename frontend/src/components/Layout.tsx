import { Outlet } from "react-router-dom";
import { ReactNode } from "react";
import { Header } from "./Header";

type Props = {
  children: ReactNode;
};

export function PageLayout() {
  return (
    <body>
      <Header />
      <main>
        <Outlet />
      </main>
    </body>
  );
}
