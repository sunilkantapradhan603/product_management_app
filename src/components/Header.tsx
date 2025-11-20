import Button from "./Button";

interface HeaderProps {
  onClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onClick }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex-1">
        <h5 className="text-lg font-semibold">Product Management</h5>
      </div>

      <div>
        <Button
          type="button"
          value="Add Product"
          bg="#1A73E8"
          color="#fff"
          onClick={onClick}
        />
      </div>
    </div>
  );
};

export default Header;
