import { useRef } from "react";
import { Chip as ChipMui, FormLabel, TextField } from "@mui/material";

//* icons *//
import { UploadOutlined } from "@mui/icons-material";

//* components *//
import { ButtonPrimary, Chip } from "../";

//* interface *//
interface Props {
  errors: any;
  getValues: any;
  newTag: any;
  onAddTag: any;
  onDeleteImage: any;
  onDeleteTag: any;
  onFilesSelected: any;
  register: any;
  setNewTag: any;
}

export const ProductEditFormRight: React.FC<Props> = ({
  errors,
  getValues,
  newTag,
  onAddTag,
  onDeleteImage,
  onDeleteTag,
  onFilesSelected,
  register,
  setNewTag,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex w-full flex-col md:w-2/4">
      <TextField
        label="Slug - URL"
        variant="filled"
        fullWidth
        sx={{ mb: 1 }}
        {...register("slug", {
          required: "Este campo es requerido",
          validate: (value: any) =>
            value.includes(" ")
              ? "No puede tener espacios en blanco"
              : undefined,
        })}
        error={!!errors.slug}
        helperText={errors.slug?.message}
      />

      <TextField
        label="Etiquetas"
        variant="filled"
        fullWidth
        sx={{ mb: 1 }}
        helperText="Presiona [spacebar] para agregar"
        onKeyDown={onAddTag}
        onChange={({ target }) => setNewTag(target.value)}
        value={newTag}
      />

      <div className="flex list-none flex-wrap">
        {getValues("tags").map((tag: string) => {
          return (
            <ChipMui
              key={tag}
              label={tag}
              onDelete={() => onDeleteTag(tag)}
              color="primary"
              size="small"
              className="ml-2 mt-2"
            />
          );
        })}
      </div>

      <hr className="my-4 text-gray/30" />

      <div className="flex flex-col">
        <FormLabel sx={{ mb: 1 }}>Imágenes</FormLabel>
        <ButtonPrimary
          onClick={() => inputRef.current?.click()}
          icon={<UploadOutlined />}
          text="Cargar Imagen"
        />
        <input
          type="file"
          multiple
          accept="image/png, image/gif, image/jpeg, image/jpg"
          className="hidden"
          ref={inputRef}
          onChange={(event) => onFilesSelected(event)}
        />

        {getValues("images").length < 2 && (
          <Chip text="Es necesario al menos 2 imagenes" status="error" />
        )}

        <div className="mt-2 flex flex-wrap gap-4">
          {getValues("images").map((img: string) => (
            <div
              className="w-[calc(33%_-_16px)] overflow-hidden rounded-lg py-2 shadow-sm shadow-primary/20 transition-all duration-300 hover:shadow-md hover:shadow-primary/30"
              key={img}
            >
              <div className="flex flex-col gap-2">
                <img
                  className="h-full w-full animate-fadeIn rounded-lg"
                  src={img}
                  alt={img}
                />
                <ButtonPrimary
                  text="Borrar"
                  color="red"
                  onClick={() => onDeleteImage(img)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
