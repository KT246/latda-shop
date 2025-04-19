import React from "react";
import HeaderLinks from "./HeaderLinks";

function Home() {
  return (
    <>
      <HeaderLinks
        name="ພາບລວມ"
        linkCreate=""
        linkLists=""
        nameCreate=""
        nameList=""
      />
      <div className="flex flex-col h-[81vh]">
        <div className="bg-blue-400 h-[15vh] flex">
          <div>box</div>
          <div>box</div>
          <div>box</div>
          <div>box</div>
        </div>
        <div className="bg-green-400 h-[66vh] flex">
          <div className="bg-red-400 w-[50vw]"> chart</div>
          <div>chart</div>
        </div>
      </div>
    </>
  );
}

export default Home;
