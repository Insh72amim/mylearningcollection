import React from "react";
import GenericBookRenderer from "../common/GenericBookRenderer";
import { hullChaptersDetailed } from "../../data/hull-chapters-data";

const HullBook = () => {
  return (
    <GenericBookRenderer
      title="Options, Futures, and Other Derivatives"
      subtitle="10th Edition"
      author="John C. Hull"
      tags={["Derivatives", "Risk Management", "Financial Engineering"]}
      chapters={hullChaptersDetailed}
      mainColor="green"
    />
  );
};

export default HullBook;
