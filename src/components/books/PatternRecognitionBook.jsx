import React from "react";
import GenericBookRenderer from "../common/GenericBookRenderer";
import { patternRecognitionChapters } from "../../data/pattern-recognition-chapters-data";

const PatternRecognitionBook = () => {
  return (
    <GenericBookRenderer
      title="Pattern Recognition and Machine Learning"
      subtitle="Christopher M. Bishop • 2006"
      author="Foundations of ML"
      tags={["Bayesian", "Probabilistic", "Models"]}
      chapters={patternRecognitionChapters}
      mainColor="amber"
    />
  );
};

export default PatternRecognitionBook;
