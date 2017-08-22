import * as React from "react";

interface ICard {
  className?: string;
  children: any;
  style?: any;
}

const Card = ({ children, style, className }: ICard) => {
  return (
    <div
      className={`pt-card pt-elevation-0 pt-elevation-1 ${className}`}
      {...style}
    >
      {children}
    </div>
  );
};

export default Card;
