import React, {
  createContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { products } from "../data/products";

export interface ProductProps {
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

interface ContextProps {
  add: (product: ProductProps) => void;
  productList: ProductProps[];
  filterList: ProductProps[];
  setSearch: (search: string) => void;
  updateList: (product: ProductProps) => void;
  deleteProduct: (id: number) => void;
}

export const productcontext = createContext<ContextProps>({
  add: () => {},
  productList: [],
  filterList: [],
  setSearch: () => {},
  updateList: () => {},
  deleteProduct: () => {},
});

const ProductContext: React.FC<PropsWithChildren> = ({ children }) => {
  const [productList, setProductList] = useState<ProductProps[]>(products);
  const [search, setSearch] = useState("");

  const add = (product: ProductProps) => {
    setProductList((prev) => [...prev, product]);
  };

  const updateList = (updated: ProductProps) => {
    setProductList((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item))
    );
  };

  const deleteProduct = (id: number) => {
    setProductList((prev) => prev.filter((p) => p.id !== id));
  };

  const filterList = useMemo(() => {
    if (!search.trim()) return productList;
    const q = search.toLowerCase();
    return productList.filter((item) => item.name.toLowerCase().includes(q));
  }, [productList, search]);

  const value = useMemo(
    () => ({
      add,
      productList,
      filterList,
      setSearch,
      updateList,
      deleteProduct,
    }),
    [productList, filterList]
  );

  return (
    <productcontext.Provider value={value}>{children}</productcontext.Provider>
  );
};

export default ProductContext;
