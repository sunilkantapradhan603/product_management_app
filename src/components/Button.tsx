interface ButtonProps {
  type: "button" | "submit";
  value?: string;
  bg?: string;
  color?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({ type, value, bg, color, onClick }) => {
  return (
    <button
      type={type}
      style={{ ...(bg && { background: bg }), ...(color && { color: color }) }}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Button;
