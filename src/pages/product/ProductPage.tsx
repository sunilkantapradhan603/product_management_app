import Button from "../../components/Button";
import Card from "../../components/Card";
import Header from "../../components/Header";

import InputElement from "../../components/InputElement";
import Table from "../../components/Table";
import useProductPage from "./useProductPage";

const ProductPage = () => {
  const {
    state,
    errors,
    show,
    headerlist,
    dispatch,
    handleAddProduct,
    handleCancelProduct,
    handleSubmit,
    handleSearch,
    productlist,
    handleEdit,
    handleDelete,
    handleGridView,
    handleTableView,
    view,
  } = useProductPage();

  return (
    <div>
      <Header onClick={handleAddProduct} />

      {/* ---------- Modal ---------- */}
      {show && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-md p-6">
            {state.id ? (
              <form onSubmit={handleSubmit}>
                <h3 className="text-center text-lg font-semibold mb-4">
                  update Product
                </h3>
                <div>
                  <InputElement
                    type="text"
                    label="Name"
                    value={state.name}
                    msg={errors.name}
                    onChange={(e) =>
                      dispatch({ type: "SetName", payload: e.target.value })
                    }
                  />
                </div>

                <div>
                  <InputElement
                    type="text"
                    label="Price"
                    value={state.price}
                    msg={errors.price}
                    onChange={(e) =>
                      dispatch({ type: "SetPrice", payload: e.target.value })
                    }
                  />
                </div>

                <div>
                  <InputElement
                    type="text"
                    label="Category"
                    value={state.category}
                    msg={errors.category}
                    onChange={(e) =>
                      dispatch({ type: "SetCategory", payload: e.target.value })
                    }
                  />
                </div>

                <div>
                  <InputElement
                    type="textarea"
                    label="Description"
                    value={state.description}
                    onChange={(e) =>
                      dispatch({
                        type: "SetDescription",
                        payload: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex justify-center form_footer gap-3 mt-4">
                  <Button
                    type="submit"
                    value="Update"
                    bg="#1A73E8"
                    color="#fff"
                  />
                  <Button
                    type="button"
                    value="Cancel"
                    color="#fff"
                    bg="orangered"
                    onClick={handleCancelProduct}
                  />
                </div>
              </form>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="text-center text-lg font-semibold mb-4">
                  Add Product
                </h3>
                <div>
                  <InputElement
                    type="text"
                    label="Name"
                    value={state.name}
                    msg={errors.name}
                    onChange={(e) =>
                      dispatch({ type: "SetName", payload: e.target.value })
                    }
                  />
                </div>

                <div>
                  <InputElement
                    type="text"
                    label="Price"
                    value={state.price}
                    msg={errors.price}
                    onChange={(e) =>
                      dispatch({ type: "SetPrice", payload: e.target.value })
                    }
                  />
                </div>
                <div>
                  <InputElement
                    type="text"
                    label="Category"
                    value={state.category}
                    msg={errors.category}
                    onChange={(e) =>
                      dispatch({ type: "SetCategory", payload: e.target.value })
                    }
                  />
                </div>

                <div>
                  <InputElement
                    type="text"
                    label="Stock"
                    value={state.stock}
                    msg={errors.stock}
                    onChange={(e) =>
                      dispatch({ type: "SetStock", payload: e.target.value })
                    }
                  />
                </div>

                <div>
                  <InputElement
                    type="textarea"
                    label="Description"
                    value={state.description}
                    onChange={(e) =>
                      dispatch({
                        type: "SetDescription",
                        payload: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex justify-center form_footer gap-3 mt-4">
                  <Button type="submit" value="Add" bg="#1A73E8" color="#fff" />
                  <Button
                    type="button"
                    value="Cancel"
                    color="#fff"
                    bg="orangered"
                    onClick={handleCancelProduct}
                  />
                </div>
              </form>
            )}
          </div>
        </div>
      )}
      <div className="flex toglebtn  justify-between items-center">
        <div className="buttondiv">
          <Button
            type="button"
            value="Grid View"
            bg={view === "grid" ? "#1A73E8" : "#fff"}
            color={view === "grid" ? "#fff" : "#000"}
            onClick={handleGridView}
          />
          <Button
            type="button"
            value="Table View"
            bg={view === "table" ? "#1A73E8" : "#fff"}
            color={view === "table" ? "#fff" : "#000"}
            onClick={handleTableView}
          />
        </div>
        <div className="Searchbar">
          <InputElement
            type="text"
            placeholder="Search products..."
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="p-4">
        <div className="mt-4">
          {view == "table" ? (
            <Table
              productlist={productlist}
              productheader={headerlist}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ) : (
            <Card
              productlist={productlist}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
