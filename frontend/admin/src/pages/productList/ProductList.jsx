import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../redux/apiCalls";

export default function ProductList() {
  const [data, setData] = useState([]);
  const {products} = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;
    fetchProducts(dispatch);
    if (isMounted) {
      setData(products);
    }

    return () => {
      isMounted = false;
    }
  }, [dispatch, products]);

  const handleDelete = (id) => {
    setData(data?.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90,
    renderCell: (params) => {
      return (
        <div>
          {/* <img className="productListImg" src={params.row.img} alt="" /> */}
          {params.row.index + 1}
        </div>
      );
    },
    },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {/* <img className="productListImg" src={params.row.img} alt="" /> */}
            {params.row.productName}
          </div>
        );
      },
    },
    { field: "stock", headerName: "Stock", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params?.row?._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      {/* {JSON.stringify(data)} */}
      {data ? (
        <DataGrid
          rows={data || []}
          disableSelectionOnClick
          columns={columns || []}
          getRowId={(data) => data._id}
          pageSize={8}
          checkboxSelection
        />
      ) : (
        <div>No products available</div>
      )}
    </div>
  );
}
