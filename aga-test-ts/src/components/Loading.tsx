import React, { FC } from "react";
import PacmanLoader from "react-spinners/PacmanLoader";

export interface Props {
  hidden: boolean;
  children: any;
}

export const Loading: FC<Props> = ({ children, hidden }) => {
  // Children are rendered when the loader is not displayed
  if (hidden === true) {
    return children || null;
  }

  return (
    <div className="contact-loading">
      <div className="contact-loading__spinner">
        <PacmanLoader size={50} color={"#8080ff"} margin={"20px"}loading={!hidden} />
      </div>
      <h1 className="contact-loading__title">Loading...</h1>
    </div>
  );
};
