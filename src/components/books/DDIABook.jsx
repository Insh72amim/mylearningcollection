import React from "react";
import GenericBookRenderer from "../common/GenericBookRenderer";
import { ddiaChaptersDetailed } from "../../data/ddia-chapters-data";

const DDIABook = () => {
  return (
    <GenericBookRenderer
      title="Designing Data-Intensive Applications"
      subtitle="The Big Ideas Behind Reliable, Scalable, and Maintainable Systems"
      author="Martin Kleppmann"
      tags={["Distributed Systems", "Database Internals", "System Design"]}
      chapters={ddiaChaptersDetailed}
      mainColor="blue"
    />
  );
};

export default DDIABook;
