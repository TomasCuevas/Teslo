import { NextPage } from "next";

//* layout *//
import { AdminLayout, LoadingLayout } from "../../../components/layouts";

//* components *//
import {
  ProductEditFormLeft,
  ButtonPrimary,
  ProductEditFormRight,
} from "../../../components";

//* icons *//
import { DriveFileRenameOutline, SaveOutlined } from "@mui/icons-material";

//* hooks *//
import { useAdmin, useCreateNewProduct, useEditProduct } from "../../../hooks";

const NewProductAdminPage: NextPage = () => {
  const { isAdmin } = useAdmin();
  const { product } = useCreateNewProduct();
  const {
    control,
    errors,
    getValues,
    handleSubmit,
    isReady,
    isSaving,
    newTag,
    onAddTag,
    onChangeSize,
    onDeleteImage,
    onDeleteTag,
    onFilesSelected,
    onSubmitForm,
    register,
    setNewTag,
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

  return <LoadingLayout title="Cargando" />;
};

export default NewProductAdminPage;
