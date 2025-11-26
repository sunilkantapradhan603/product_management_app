import { useContext, useEffect, useReducer, useState } from "react";
import { productcontext } from "../../context/ProductContext";

interface ProductProps {
  id: number;
  name: string;
  price: string;
  category: string;
  stock: string;
  description: string;
  createdAt?: string;
  isActive?: boolean;
  tags?: string[];
}

interface InitProps {
  id: number;
  name: string;
  price: string;
  category: string;
  stock: string;
  description: string;
}

const initialState: InitProps = {
  id: 0,
  name: "",
  price: "",
  category: "",
  stock: "",
  description: "",
};

type Action =
  | { type: "SetName"; payload: string }
  | { type: "SetPrice"; payload: string }
  | { type: "SetCategory"; payload: string }
  | { type: "SetDescription"; payload: string }
  | { type: "SetStock"; payload: string }
  | { type: "SetAll"; payload: ProductProps }
  | { type: "Reset" };

const reducer = (state: InitProps, action: Action): InitProps => {
  switch (action.type) {
    case "SetName":
      return { ...state, name: action.payload };
    case "SetPrice":
      return { ...state, price: action.payload };
    case "SetCategory":
      return { ...state, category: action.payload };
    case "SetDescription":
      return { ...state, description: action.payload };
    case "SetStock":
      return { ...state, stock: action.payload };
    case "SetAll":
      return {
        id: action.payload.id,
        name: action.payload.name,
        price: action.payload.price,
        category: action.payload.category,
        stock: action.payload.stock,
        description: action.payload.description,
      };
    case "Reset":
      return initialState;
    default:
      return state;
  }
};

const useProductPage = () => {
  const contextApi = useContext(productcontext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [errors, setErrors] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
  });

  const [show, setShow] = useState<boolean>(false);
  const [search, setSearchLocal] = useState<string>("");
  const [view, setView] = useState<string>("table");

  const headerlist = {
    name: "Name",
    price: "Price",
    category: "Category",
    stock: "Stock",
    description: "Description",
    action: "Action",
  };

  const validate = () => {
    const temp: any = {};
    temp.name = state.name.trim() ? "" : "Name is required";
    temp.price = state.price
      ? isNaN(Number(state.price))
        ? "Price must be a number"
        : ""
      : "Price is required";
    temp.category = state.category.trim() ? "" : "Category is required";
    temp.stock = state.stock
      ? isNaN(Number(state.stock))
        ? "Stock must be a number"
        : ""
      : "Stock is required";

    setErrors(temp);
    return Object.values(temp).every((v) => v === "");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    if (state.id) {
      contextApi.updateList(state);
    } else {
      const newProduct: ProductProps = {
        ...state,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        isActive: true,
        tags: [],
      };

      contextApi.add(newProduct);
    }

    dispatch({ type: "Reset" });
    setShow(false);
  };

  const handleAddProduct = () => {
    dispatch({ type: "Reset" });
    setShow(true);
  };

  const handleSearch = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchLocal(e.target.value);
  };

  useEffect(() => {
    const t = setTimeout(() => {
      contextApi.setSearch(search);
    }, 500);

    return () => clearTimeout(t);
  }, [search]);

  const productlist = contextApi.filterList;

  const handleEdit = (id: number) => {
    const original = contextApi.productList.find((p) => p.id === id);
    if (!original) return;

    dispatch({ type: "SetAll", payload: original });
    setShow(true);
  };

  const handleDelete = (id: number) => {
    contextApi.deleteProduct(id);
  };

  const handleCancelProduct = () => {
    dispatch({ type: "Reset" });
    setShow(false);
  };

  const handleTableView = () => setView("table");
  const handleGridView = () => setView("grid");

  return {
    state,
    errors,
    show,
    headerlist,
    dispatch,
    handleSubmit,
    handleSearch,
    handleAddProduct,
    handleCancelProduct,
    productlist,
    handleEdit,
    handleDelete,
    handleTableView,
    handleGridView,
    view,
  };
};

export default useProductPage;
