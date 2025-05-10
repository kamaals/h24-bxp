/* istanbul ignore file @preserve */

import React from "react";
import PageTitle from "@/components/atoms/page-title";

async function Page() {
  return (
    <article className={"flex flex-col gap-y-4"}>
      <PageTitle title={"Dashboard"} />
    </article>
  );
}

export default Page;
