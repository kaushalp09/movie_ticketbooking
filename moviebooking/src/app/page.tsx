"use client"
import Image from "next/image";
import styles from "./page.module.css";
import HomeSlider from "./components/Navbar/HomeSlider/HomeSlider";
import Moviecarousel from "./components/Navbar/moviecarousel/MovieCarousel";

export default function Home() {
  return (
    <main className={styles.main}>
      <HomeSlider/>
      <Moviecarousel/>
    </main>
  );
}
