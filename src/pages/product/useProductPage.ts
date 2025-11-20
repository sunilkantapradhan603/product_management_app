import { useContext, useEffect, useReducer, useState } from "react";
import { productcontext } from "../../context/ProductContext";
import { v4 as uuidv4 } from "uuid";
interface ProductProps {
  id: string;
  name: string;
  price: string;
  category: string;
  stock: string;
  description: string;
}
interface InitProps {
  id: string;
  name: string;
  price: string;
  category: string;
  stock: string;
  description: string;
}

const initialState: InitProps = {
  id: "",
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
  | { type: "SetAll"; payload: InitProps }
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
      return { ...action.payload };
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
  // header labels
  const headerlist = {
    name: "Name",
    price: "Price",
    category: "Category",
    stock: "Stock",
    description: "Description",
    action: "Action",
  };

  // validation
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
      contextApi.updateList({ ...state } as ProductProps);
    } else {
      contextApi.add({ ...(state as ProductProps), id: uuidv4() });
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
  }, [search, contextApi.setSearch]);

  const productlist = contextApi.filterList;

  const handleEdit = (id: string) => {
    const original = contextApi.productList.find((p) => p.id === id);
    if (!original) return;
    dispatch({ type: "SetAll", payload: original as InitProps });
    setShow(true);
  };

  const handleDelete = (id: string) => {
    contextApi.deleteProduct(id);
  };

  const handleCancelProduct = () => {
    dispatch({ type: "Reset" });
    setShow(false);
  };

  const handleTableView = () => {
    setView("table");
  };
  const handleGridView = () => {
    setView("grid");
  };
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
