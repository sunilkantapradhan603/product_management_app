import { useState } from "react";
import Button from "./Button";

interface ProductListProps {
  id: string;
  name: string;
  price: string;
  category: string;
  stock: string;
  description: string;
}

interface ProductHeaderProps {
  name: string;
  price: string;
  category: string;
  stock: string;
  description: string;
  action: string;
}

interface TableProps {
  productlist: ProductListProps[];
  productheader: ProductHeaderProps;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const Table: React.FC<TableProps> = ({
  productlist,
  productheader,
  onEdit,
  onDelete,
}) => {
  const [active, setActive] = useState<string>("");
  const rowsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(productlist.length / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = productlist.slice(startIndex, startIndex + rowsPerPage);

  const handlePrev = () => {
    setActive("prev");
    setCurrentPage((p) => Math.max(p - 1, 1));
  };
  const handleNext = () => {
    setActive("next");
    setCurrentPage((p) => Math.min(p + 1, totalPages));
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300">
        {/* ---------- Table Head ---------- */}
        <thead className="bg-gray-100">
          <tr className="border-b border-gray-300">
            <th className="px-4 py-2 text-sm font-medium border border-gray-300">
              {productheader.name}
            </th>
            <th className="px-4 py-2 text-sm font-medium border border-gray-300">
              {productheader.price}
            </th>
            <th className="px-4 py-2 text-sm font-medium border border-gray-300">
              {productheader.category}
            </th>
            <th className="px-4 py-2 text-sm font-medium border border-gray-300">
              {productheader.stock}
            </th>
            <th className="px-4 py-2 text-sm font-medium border border-gray-300 max-w-[200px]">
              {productheader.description}
            </th>
            <th className="px-4 py-2 text-sm font-medium border border-gray-300">
              {productheader.action}
            </th>
          </tr>
        </thead>

        {/* ---------- Table Body ---------- */}
        <tbody>
          {currentRows.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="px-4 py-2 text-center text-gray-500 border border-gray-300"
              >
                No records
              </td>
            </tr>
          ) : (
            currentRows.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-xs font-medium border border-gray-300">
                  {p.name}
                </td>
                <td className="px-4 py-2 text-xs font-medium border border-gray-300">
                  {p.price}
                </td>
                <td className="px-4 py-2 text-xs font-medium border border-gray-300">
                  {p.category}
                </td>
                <td className="px-4 py-2 text-xs font-medium border border-gray-300">
                  {p.stock}
                </td>
                <td className="px-4 py-2 text-xs font-medium border border-gray-300 break-words max-w-[200px]">
                  {p.description}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <div className="flex justify-center items-center gap-2">
                    <Button
                      type="button"
                      value="Edit"
                      bg="#1A73E8"
                      color="#fff"
                      onClick={() => onEdit(p.id)}
                    />
                    <Button
                      type="button"
                      value="Delete"
                      bg="orangered"
                      color="#fff"
                      onClick={() => onDelete(p.id)}
                    />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* ---------- Pagination Section (Correct placement OUTSIDE tbody) ---------- */}
      {totalPages > 1 && (
        <div className=" Pagination flex justify-center items-center gap-4 mt-4">
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
    </div>
  );
};

export default Table;
