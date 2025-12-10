import React from "react";
import GenericBookRenderer from "../common/GenericBookRenderer";
import { linearAlgebraChapters } from "../../data/linear-algebra-chapters-data";

const LinearAlgebraBook = () => {
  return (
    <GenericBookRenderer
      title="Linear Algebra"
      subtitle="Lipschutz & Lipson • Schaum's Outline"
      author="Fundamentals"
      tags={["Vectors", "Matrices", "Spaces"]}
      chapters={linearAlgebraChapters}
      mainColor="cyan"
    />
  );
};

export default LinearAlgebraBook;
