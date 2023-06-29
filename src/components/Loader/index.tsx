import Image from "next/image";
import GifLoading from "@/public/gifs/Pulse-1s-200px.gif";

export default function Loader() {
  // Or a custom loading skeleton component
  return (
    <div className="w-screen h-screen bg-bgPrimary flex flex-col justify-center">
      <Image
        src={GifLoading}
        alt="loader"
        className="w-[130px] h-[130px] mx-auto"
      />
    </div>
  );
}
