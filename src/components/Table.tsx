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
  const rowsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(productlist.length / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = productlist.slice(startIndex, startIndex + rowsPerPage);

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border-b border-gray-300 text-sm font-medium">
              {productheader.name}
            </th>
            <th className="px-4 py-2 border-b border-gray-300 text-sm font-medium">
              {productheader.price}
            </th>
            <th className="px-4 py-2 border-b border-gray-300 text-sm font-medium">
              {productheader.category}
            </th>
            <th className="px-4 py-2 border-b border-gray-300 text-sm font-medium">
              {productheader.stock}
            </th>
            <th className="px-4 py-2 border-b border-gray-300 text-sm font-medium max-w-[200px]">
              {productheader.description}
            </th>
            <th className="px-4 py-2 border-b border-gray-300 text-sm font-medium">
              {productheader.action}
            </th>
          </tr>
        </thead>

        <tbody>
          {currentRows.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-4 py-2 text-center text-gray-500">
                No records
              </td>
            </tr>
          ) : (
            currentRows.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-xs font-medium">{p.name}</td>
                <td className="px-4 py-2 text-xs font-medium">{p.price}</td>
                <td className="px-4 py-2 text-xs font-medium">{p.category}</td>
                <td className="px-4 py-2 text-xs font-medium">{p.stock}</td>
                <td className="px-4 py-2 text-xs font-medium  max-w-[200px] overflow-y-auto break-words">
                  {p.description}
                </td>
                <td className="px-4 py-2 flex justify-center items-center gap-2">
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
                    color="#fff"
                    bg="orangered"
                    onClick={() => onDelete(p.id)}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* ---------- Pagination Footer ---------- */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <Button type="button" value="Prev" onClick={handlePrev} />
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button type="button" value="Next" onClick={handleNext} />
        </div>
      )}
    </div>
  );
};

export default Table;
