import { NextPage } from "next";
import { useRouter } from "next/router";

//* layout *//
import { AdminLayout } from "../../../components/layouts";

//* components *//
import {
  ProductEditFormLeft,
  ButtonPrimary,
  ProductEditFormRight,
  FullScreenLoading,
} from "../../../components";

//* icons *//
import { DriveFileRenameOutline, SaveOutlined } from "@mui/icons-material";

//* hooks *//
import { useAdmin, useEditProduct, useGetProduct } from "../../../hooks";

const ProductAdminPage: NextPage = () => {
  const router = useRouter();
  const { slug } = router.query as { slug: string };

  const { isAdmin } = useAdmin("/", `/admin/products/${slug}`);
  const { product } = useGetProduct(slug, "/admin/products");
  const {
    handleSubmit,
    isSaving,
    onSubmitForm,
    control,
    errors,
    getValues,
    onChangeSize,
    register,
    newTag,
    onAddTag,
    onDeleteImage,
    onDeleteTag,
    onFilesSelected,
    setNewTag,
    isReady,
  } = useEditProduct(product);

  if (isAdmin && isReady && product) {
    return (
      <AdminLayout
        title={"Producto"}
        subtitle={`Editando: ${product.title}`}
        icon={<DriveFileRenameOutline />}
        pageDescription={`Pagina de edicion del producto ${product.title}`}
      >
        <form className="my-4" onSubmit={handleSubmit(onSubmitForm)}>
          <div className="mb-4 w-full">
            <ButtonPrimary
              type="submit"
              text="Guardar"
              disabled={isSaving}
              icon={<SaveOutlined />}
            />
          </div>
          <div className="flex flex-col gap-5 md:flex-row">
            <ProductEditFormLeft
              control={control}
              errors={errors}
              getValues={getValues}
              onChangeSize={onChangeSize}
              register={register}
            />
            <ProductEditFormRight
              errors={errors}
              getValues={getValues}
              newTag={newTag}
              onAddTag={onAddTag}
              onDeleteImage={onDeleteImage}
              onDeleteTag={onDeleteTag}
              onFilesSelected={onFilesSelected}
              register={register}
              setNewTag={setNewTag}
            />
          </div>
        </form>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title={"Producto"}
      subtitle="Editando:"
      icon={<DriveFileRenameOutline />}
      pageDescription="Pagina de edicion del producto"
    >
      <FullScreenLoading />
    </AdminLayout>
  );
};

export default ProductAdminPage;
