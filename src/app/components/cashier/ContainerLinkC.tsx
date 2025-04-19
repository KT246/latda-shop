import React from "react";

const ContainerLinkC = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-[90vh] max-w-[94vw] px-3 pt-5 pb-3">
      <div className="w-full h-full bg-gray-50 rounded-lg">{children}</div>
    </div>
  );
};

export default ContainerLinkC;
