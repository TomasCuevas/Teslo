import { NextPage } from "next";
import { useRouter } from "next/router";
import NextLink from "next/link";
import useSWRInmutable from "swr/immutable";

import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

//* icons *//
import { AddOutlined, CategoryOutlined } from "@mui/icons-material";

//* layout *//
import { AdminLayout } from "../../../components/layouts";

//* components *//
import { ButtonPrimary, FullScreenLoading } from "../../../components";

//* hooks *//
import { useAdmin } from "../../../hooks";

const columns: GridColDef[] = [
  {
    field: "img",
    headerName: "Foto",
    width: 100,
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <a
          className="h-full w-full"
          href={`/product/${row.slug}`}
          target="__blank"
          rel="noreferrer"
        >
          <img
            src={
              row.img.includes("https://") ? row.img : `/products/${row.img}`
            }
            alt={row.title}
            className="h-full w-full animate-fadeIn object-cover"
          />
        </a>
      );
    },
  },
  {
    field: "title",
    headerName: "Titulo",
    width: 250,
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <NextLink href={`/admin/products/${row.slug}`} passHref>
          <a className="block w-full text-center text-secundary/70 underline transition-all duration-300 hover:text-secundary/100">
            {row.title}
          </a>
        </NextLink>
      );
    },
  },
  { field: "gender", headerName: "Genero", width: 150, align: "center" },
  { field: "type", headerName: "Tipo", width: 150, align: "center" },
  { field: "inStock", headerName: "Inventario", width: 150, align: "center" },
  { field: "price", headerName: "Precio", width: 150, align: "center" },
  { field: "sizes", headerName: "Tallas", width: 200, align: "center" },
];

//* interfaces *//

import { IProduct } from "../../../interfaces/products";

const ProductsPage: NextPage = () => {
  const { isAdmin } = useAdmin("/", "/admin/products");
  const { data: products = [] } = useSWRInmutable<IProduct[]>(
    "/api/admin/products",
    { refreshInterval: 30 * 1000 }
  );

  const router = useRouter();

  const rows = products.map((product) => ({
    id: product._id,
    img: product.images[0],
    title: product.title,
    gender: product.gender,
    type: product.type,
    inStock: product.inStock,
    price: product.price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    }),
    sizes: product.sizes.join(", "),
    slug: product.slug,
  }));

  if (isAdmin) {
    return (
      <AdminLayout
        title={`Productos (${products?.length})`}
        subtitle="Mantenimiento de productos"
        icon={<CategoryOutlined />}
        pageDescription="Dashboard de mantenimiento de todos los productos"
      >
        <div className="my-4 flex w-full justify-end">
          <ButtonPrimary
            onClick={() => router.push("/admin/products/new")}
            icon={<AddOutlined />}
            text="Crear producto"
          />
        </div>
        <div className="mt-2 animate-fadeIn">
          <div className="h-[650px]">
            <DataGrid
              className="animate-fadeIn"
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
            />
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title={`Productos (${products?.length})`}
      subtitle="Mantenimiento de productos"
      icon={<CategoryOutlined />}
      pageDescription="Dashboard de mantenimiento de todos los productos"
    >
      <FullScreenLoading />
    </AdminLayout>
  );
};

export default ProductsPage;
