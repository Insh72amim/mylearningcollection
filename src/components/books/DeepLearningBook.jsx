import React from "react";
import GenericBookRenderer from "../common/GenericBookRenderer";
import { deepLearningChapters } from "../../data/deep-learning-chapters-data";

const DeepLearningBook = () => {
  return (
    <GenericBookRenderer
      title="Deep Learning"
      subtitle="Ian Goodfellow, Yoshua Bengio, Aaron Courville"
      author="Foundations & Methodology"
      tags={["Foundations", "Neural Networks", "Representation Learning"]}
      chapters={deepLearningChapters}
      mainColor="purple"
    />
  );
};

export default DeepLearningBook;
