import Image from "next/image";
import Loader from "./_globalComponent/Loader";
import Link from "next/link";
export default function Home() {
  return (
   <>
     <div className=" flex-col h-screen w-screen bg-gray-950 flex justify-center items-center">
      <h1 className=" my-9 text-white text-2xl">Welcome , please Register or sign in to continue</h1>
      <div className=" flex flex-col gap-4 items-center h-40 w-60 rounded-md">
        <Link href={"/SignIn"}>
        <button className=" bg-primary w-24 text-white px-4 py-2 rounded-md">
          Register
        </button>
        </Link>
        <Link href={"/LoginPage"}>
        <button className=" bg-primary w-24 text-white px-4 py-2 rounded-md">
          Sign in
        </button>
        </Link>
        </div>
     </div>
    
    </>
  );
}
