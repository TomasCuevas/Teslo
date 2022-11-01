import { Controller } from "react-hook-form";
import {
  capitalize,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

//* valid data for form *//
const validTypes = ["shirts", "pants", "hoodies", "hats"];
const validGender = ["men", "women", "kid", "unisex"];
const validSizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

//* interface *//
interface Props {
  control: any;
  errors: any;
  getValues: any;
  onChangeSize: any;
  register: any;
}

export const ProductEditFormLeft: React.FC<Props> = ({
  control,
  errors,
  getValues,
  onChangeSize,
  register,
}) => {
  return (
    <div className="flex w-full flex-col md:w-2/4">
      <TextField
        label="Título"
        variant="filled"
        fullWidth
        sx={{ mb: 1 }}
        {...register("title", {
          required: "Este campo es requerido",
          minLength: { value: 5, message: "Mínimo 5 caracteres" },
        })}
        error={!!errors.title}
        helperText={errors.title?.message}
      />

      <TextField
        label="Descripción"
        variant="filled"
        fullWidth
        multiline
        sx={{ mb: 1 }}
        {...register("description", {
          required: "Este campo es requerido",
          minLength: { value: 5, message: "Mínimo 5 caracteres" },
        })}
        error={!!errors.description}
        helperText={errors.description?.message}
      />

      <TextField
        label="Inventario"
        type="number"
        variant="filled"
        fullWidth
        sx={{ mb: 1 }}
        {...register("inStock", {
          required: "Este campo es requerido",
          min: { value: 0, message: "Minimo de valor 0" },
        })}
        error={!!errors.inStock}
        helperText={errors.inStock?.message}
      />

      <TextField
        label="Precio"
        type="number"
        variant="filled"
        fullWidth
        sx={{ mb: 1 }}
        {...register("price", {
          required: "Este campo es requerido",
          min: { value: 0, message: "Valor minimo de $0" },
        })}
        error={!!errors.price}
        helperText={errors.price?.message}
      />

      <hr className="my-2 text-gray/30" />

      <Controller
        name="type"
        control={control}
        defaultValue={undefined}
        render={({ field }) => (
          <FormControl sx={{ mb: 1 }}>
            <FormLabel>Tipo</FormLabel>
            <RadioGroup row {...field}>
              {validTypes.map((option) => (
                <FormControlLabel
                  key={option}
                  value={option}
                  control={<Radio className="checked:text-secundary" />}
                  label={capitalize(option)}
                />
              ))}
            </RadioGroup>
          </FormControl>
        )}
      />

      <Controller
        name="gender"
        control={control}
        defaultValue={undefined}
        render={({ field }) => (
          <FormControl sx={{ mb: 1 }}>
            <FormLabel>Género</FormLabel>
            <RadioGroup row {...field}>
              {validGender.map((option) => (
                <FormControlLabel
                  key={option}
                  value={option}
                  control={<Radio className="checked:text-secundary" />}
                  label={capitalize(option)}
                />
              ))}
            </RadioGroup>
          </FormControl>
        )}
      />

      <FormGroup>
        <FormLabel>Tallas</FormLabel>
        {validSizes.map((size) => (
          <FormControlLabel
            key={size}
            control={
              <Checkbox
                className="checked:text-secundary"
                checked={getValues("sizes").includes(size)}
              />
            }
            label={size}
            onChange={() => onChangeSize(size)}
          />
        ))}
      </FormGroup>
    </div>
  );
};
