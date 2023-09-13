import { Select, SelectItem } from "@/components/Select";
import { Controller, useForm } from "react-hook-form";

export default function test() {
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Select
            onSelect={(value) => {
              field.onChange(value);
            }}
            value={field.value}
          >
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
          </Select>
        )}
      />
      <input type="submit" />
    </form>
  );
}
