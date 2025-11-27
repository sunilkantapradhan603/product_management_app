import { useState } from "react";
import Button from "./Button";

interface ProductListProps {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
  description: string;
  createdAt?: string;
  isActive?: boolean;
  tags?: string[];
}

interface CardProps {
  productlist: ProductListProps[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const Card: React.FC<CardProps> = ({ productlist, onEdit, onDelete }) => {
  const [active, setActive] = useState<string>("");
  const rowsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(productlist.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentCards = productlist.slice(startIndex, startIndex + rowsPerPage);

  const handlePrev = () => {
    setActive("prev");
    setCurrentPage((p) => Math.max(p - 1, 1));
  };
  const handleNext = () => {
    setActive("next");
    setCurrentPage((p) => Math.min(p + 1, totalPages));
  };

  return (
    <div>
      {productlist.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No products available
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            {currentCards.map((list) => (
              <div
                key={list.id}
                className="border rounded-xl cartl shadow-md p-4 flex flex-col justify-between hover:shadow-xl transition-all duration-300 bg-white"
              >
                {/* ---------- Header ---------- */}
                <div className="cart-header mb-3 p-2  rounded-t-lg">
                  <h3 className="font-bold text-lg text-center  font-medium ">
                    {list.name}
                  </h3>
                </div>

                {/* ---------- Body ---------- */}
                <div className="cart-body mb-3 p-2 space-y-1 text-gray-700 text-sm">
                  <p>
                    <span className="font-semibold">Price:</span> {list.price}
                  </p>
                  <p>
                    <span className="font-semibold">Category:</span>{" "}
                    {list.category}
                  </p>
                  <p>
                    <span className="font-semibold">Stock:</span> {list.stock}
                  </p>
                  <p className="text-gray-600 text-sm truncate">
                    <span className="font-semibold">Description:</span>
                    {list.description}
                  </p>
                </div>

                {/* ---------- Footer / Buttons ---------- */}
                <div className="flex gap-2 justify-center items-center form_footer mt-2">
                  <Button
                    type="button"
                    value="Edit"
                    bg="#1A73E8"
                    color="#fff"
                    onClick={() => onEdit(list.id)}
                  />
                  <Button
                    type="button"
                    value="Delete"
                    color="#fff"
                    bg="orangered"
                    onClick={() => onDelete(list.id)}
                  />
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className=" Pagination Pagination flex justify-center items-center gap-4 mt-4">
              <Button
                type="button"
                value="Prev"
                bg={active === "prev" ? "#1A73E8" : "#eff0f1"}
                color={active === "prev" ? "#fff" : "#000"}
                onClick={handlePrev}
              />
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <Button
                type="button"
                value="Next"
                bg={active === "next" ? "#1A73E8" : "#eff0f1"}
                color={active === "next" ? "#fff" : "#000"}
                onClick={handleNext}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Card;
