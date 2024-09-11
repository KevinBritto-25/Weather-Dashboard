import Image from "next/image";
import { HomePageNew1 } from "../components/component/home-page-new1";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <HomePageNew1 />
    </main>
  );
}
