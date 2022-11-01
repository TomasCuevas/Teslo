/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

//* api *//
import tesloApi from "../axios/tesloApi";

//* interfaces *//
import { IProduct } from "../interfaces/products";

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

export const useEditProduct = (product: IProduct) => {
  const [newTag, setNewTag] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);

  const router = useRouter();

  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
  } = useForm<FormData>();

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

  useEffect(() => {
    if (product) {
      reset(product);
      setIsReady(true);
    }
  }, [product]);

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

    form.images = form.images.map((image) => {
      if (image.includes(process.env.NEXT_PUBLIC_HOST_NAME!)) {
        return image.split("/").at(-1)!;
      }

      return image;
    });

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
      console.log(error);
      setIsSaving(false);
    }
  };

  return {
    //* properties
    errors,
    isReady,
    isSaving,
    newTag,

    //* methods
    control,
    getValues,
    handleSubmit,
    onAddTag,
    onChangeSize,
    onDeleteImage,
    onDeleteTag,
    onFilesSelected,
    onSubmitForm,
    register,
    setNewTag,
  };
};
