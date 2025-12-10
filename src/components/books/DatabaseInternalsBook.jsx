import React from "react";
import GenericBookRenderer from "../common/GenericBookRenderer";
import { dbInternalsChapters } from "../../data/db-internals-chapters-data";

const DatabaseInternalsBook = () => {
  return (
    <GenericBookRenderer
      title="Database Internals"
      subtitle="Alex Petrov • 2019"
      author="Storage & Distribution"
      tags={["Storage Engines", "B-Trees", "Distributed Systems", "Consensus"]}
      chapters={dbInternalsChapters}
      mainColor="purple"
    />
  );
};

export default DatabaseInternalsBook;
