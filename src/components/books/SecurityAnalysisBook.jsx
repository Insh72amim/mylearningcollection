import React from 'react';
import GenericBookRenderer from '../common/GenericBookRenderer';
import { securityAnalysisChapters } from '../../data/security-analysis-chapters-data';

const SecurityAnalysisBook = () => {
  return (
    <GenericBookRenderer
      title="Security Analysis"
      subtitle="Benjamin Graham & David Dodd • 6th Edition"
      author="Value Investing"
      tags={["Value Investing", "Fundamental Analysis", "Classic"]}
      chapters={securityAnalysisChapters}
      mainColor="yellow"
    />
  );
};

export default SecurityAnalysisBook;
