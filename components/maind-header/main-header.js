import Link from "next/link";
import Image from "next/image";

import MainHeaderBackground from "./main-header-background";

import logoImg from "@/assets/logo.png";
import classes from "./main-header.module.css";
import { NavLink } from "./nav-link";

export default function MainHeaderPage() {
  return (
    <>
      <MainHeaderBackground />

      <header className={classes.header}>
        <Link className={classes.logo} href="/">
          <Image src={logoImg} alt="A plate wite food on it" priority />
          NextLevel food
        </Link>

        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink href="/meals" className="">
                Browse Meals
              </NavLink>
            </li>
            <li>
              <NavLink href="/community">Browse Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
