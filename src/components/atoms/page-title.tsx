import React from "react";

function PageTitle({ title }: { title: string }) {
  return (
    <h1 className={"text-2xl md:text-3xl lg:text-4xl font-bold font-sans"}>
      {title}
    </h1>
  );
}

export default PageTitle;
