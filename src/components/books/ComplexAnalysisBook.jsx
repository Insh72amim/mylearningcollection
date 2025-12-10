import React from "react";
import GenericBookRenderer from "../common/GenericBookRenderer";
import { complexAnalysisChapters } from "../../data/complex-analysis-chapters-data";

const ComplexAnalysisBook = () => {
  return (
    <GenericBookRenderer
      title="Complex Variables"
      subtitle="Murray R. Spiegel • Schaum's Outline"
      author="Calculus & Analysis"
      tags={["Calculus", "Analysis", "Problems"]}
      chapters={complexAnalysisChapters}
      mainColor="indigo"
    />
  );
};

export default ComplexAnalysisBook;
