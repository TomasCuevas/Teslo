import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

//* database *//
import ProductModel from "../../../database/models/Product";

//* layout *//
import { AdminLayout, LoadingLayout } from "../../../components/layouts";

//* components *//
import {
  ProductEditFormLeft,
  ButtonPrimary,
  ProductEditFormRight,
} from "../../../components";

//* database *//
import { getProductBySlug } from "../../../database/dbProducts";

//* icons *//
import { DriveFileRenameOutline, SaveOutlined } from "@mui/icons-material";

//* hooks *//
import { useAdmin } from "../../../hooks";

//* api *//
import tesloApi from "../../../axios/tesloApi";

//* intefaces *//
import { IProduct } from "../../../interfaces/products";

interface FormData {
  _id?: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: string[];
  slug: string;
  tags: string[];
  title: string;
  type: string;
  gender: "men" | "women" | "kid" | "unisex";
}

interface Props {
  product: IProduct;
}

const ProductAdminPage: NextPage<Props> = ({ product }) => {
  const { isAdmin } = useAdmin("/", `/admin/products/${product.slug}`);
  const [newTag, setNewTag] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    control,
    watch,
  } = useForm<FormData>({
    defaultValues: product,
  });

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === "title") {
        const newSlug =
          value.title
            ?.trim()
            .replaceAll(" ", "_")
            .replaceAll("'", "")
            .toLowerCase() || "";

        setValue("slug", newSlug);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  //* change size
  const onChangeSize = (size: string) => {
    const currentSizes = getValues("sizes");
    if (currentSizes.includes(size)) {
      return setValue(
        "sizes",
        currentSizes.filter((s) => s !== size),
        { shouldValidate: true }
      );
    }

    setValue("sizes", [...currentSizes, size], { shouldValidate: true });
  };

  //* add tag
  const onAddTag = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.code === "Space" && newTag.trim().length > 1) {
      const currentTags = getValues("tags");
      if (currentTags.includes(newTag.trim().toLowerCase())) return;

      setValue("tags", [...currentTags, newTag.trim().toLowerCase()]);
      setNewTag("");
    }
  };

  //* delete tag
  const onDeleteTag = (tag: string) => {
    const currentTags = getValues("tags");
    setValue(
      "tags",
      currentTags.filter((t) => t !== tag),
      { shouldValidate: true }
    );
  };

  //* update images
  const onFilesSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!target.files || target.files.length === 0) return;

    try {
      for (const file of target.files) {
        const formData = new FormData();
        formData.append("file", file);
        const { data } = await tesloApi.post<{ message: string }>(
          "/admin/upload",
          formData
        );

        setValue("images", [...getValues("images"), data.message], {
          shouldValidate: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //* delete image
  const onDeleteImage = (image: string) => {
    setValue(
      "images",
      getValues("images").filter((img) => img !== image),
      { shouldValidate: true }
    );
  };

  //* submit form
  const onSubmitForm = async (form: FormData) => {
    if (form.images.length < 2) return;
    setIsSaving(true);

    try {
      const { data } = await tesloApi({
        url: "/admin/products",
        method: form._id ? "PUT" : "POST",
        data: form,
      });

      if (!form._id) {
        router.replace(`/admin/products/${data.slug}`);
      } else {
        setIsSaving(false);
      }
    } catch (error) {
      setIsSaving(false);
    }
  };

  if (isAdmin) {
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

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug = "" } = query;

  let product: IProduct | null;

  if (slug === "new") {
    const tempProduct = JSON.parse(JSON.stringify(new ProductModel()));
    delete tempProduct._id;

    product = tempProduct;
  } else {
    product = await getProductBySlug(slug.toString());
  }

  if (!product) {
    return {
      redirect: {
        destination: "/admin/products",
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
  };
};

export default ProductAdminPage;
