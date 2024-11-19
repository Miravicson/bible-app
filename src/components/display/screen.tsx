import { Scripture } from "@/lib/types";

  function Screen({scripture}: {scripture: Scripture | null}) {


    return (
      <div className='relative flex items-center justify-center w-screen h-screen px-6 bg-green-500'>
          <div className="w-full h-full absolute bg-black z-[1] opacity-35">
  
          </div>
        <div className="absolute z-0 w-full h-full">
          <video src="https://cdn.pixabay.com/video/2016/09/13/5200-183786525_large.mp4" autoPlay loop className="object-cover w-full h-full"/>
        </div>
        <div className="z-50 flex flex-col w-full gap-5">
  
          {/* SCRIPTURE TEXT */}
          <h1 className="font-bold text-[#262626] !text-white text-4xl">
           { scripture && scripture?.message}
          </h1>
  
          {/* VERSE LOCATION */}
          <p className="text-right text-[#262626] !text-white text-2xl font-semibold">{ 
            scripture && scripture.verse
          }</p>
        </div>
      </div>
    );
  }

  export default Screen