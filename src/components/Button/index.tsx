import { FC } from "react";

interface Props {
  children: string;
  onClick(): void;
}

const Button: FC<Props> = ({ children, onClick }) => (
  <button className="custom-button" onClick={onClick} role="button">
    {children}
  </button>
);

export default Button;
