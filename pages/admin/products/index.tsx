import { useState, useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import NextLink from "next/link";
import Image from "next/future/image";
import useSWR from "swr";

import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

//* icons *//
import { AddOutlined, CategoryOutlined } from "@mui/icons-material";

//* layout *//
import { AdminLayout, LoadingLayout } from "../../../components/layouts";

//* components *//
import { ButtonPrimary } from "../../../components";

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
          <Image
            src={
              row.img.includes("https://") ? row.img : `/products/${row.img}`
            }
            alt={row.title}
            className="h-full w-full animate-fadeIn object-cover"
            width={0}
            height={0}
            sizes="100%"
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
  const [products, setProducts] = useState<IProduct[]>([]);
  const { isAdmin } = useAdmin({ query: "/admin/products" });

  const { data } = useSWR<IProduct[]>("/api/admin/products");
  const router = useRouter();

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

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
        title={`Productos (${data?.length})`}
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

  return <LoadingLayout title="Cargando" />;
};

export default ProductsPage;
