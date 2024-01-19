import ContentLoader from 'react-content-loader';
import React from 'react';

const Skeleton:React.FC = () => {
  return (
    <ContentLoader
      className="pizza-block"
      speed={2}
      width={280}
      height={466}
      viewBox="0 0 280 466"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <circle cx="134" cy="126" r="126" />
      <rect x="0" y="273" rx="4" ry="4" width="280" height="27" />
      <rect x="0" y="320" rx="11" ry="11" width="280" height="76" />
      <rect x="0" y="423" rx="9" ry="9" width="90" height="27" />
      <rect x="126" y="412" rx="33" ry="33" width="152" height="45" />
    </ContentLoader>
  );
};

export default Skeleton;
