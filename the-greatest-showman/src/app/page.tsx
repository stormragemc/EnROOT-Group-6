import Image from "next/image";
import styles from "./page.module.css";
import HomePageC from "@/components/pageContent/HomePageC";
export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <HomePageC/>
      </main>
    </div>
  );
}
