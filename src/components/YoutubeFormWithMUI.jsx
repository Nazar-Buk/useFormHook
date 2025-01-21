/////////////////////////
////  npm install @mui/material @emotion/react @emotion/styled
////
/////////////////////////

import { useForm, useFieldArray } from "react-hook-form"; // useFieldArray працює лише з обєктами в масиві, не пхай в масив просто стрічки
import { DevTool } from "@hookform/devtools";
import { TextField, Button, Stack } from "@mui/material";

const YoutubeFormWithMUI = () => {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
    reset,
    trigger,
  } = form;

  const {
    errors,
    touchedFields,
    dirtyFields,
    isDirty,
    isValid,
    isSubmitting,
    isSubmitted,
    isSubmitSuccessful,
    submitCount, //  рахує скільки разів форма була успішно відправлена
  } = formState;

  const onSubmitMy = (data) => {
    console.log(data, "Form Submitted!");
    // не рекомендовано використовувати  цій фн reset
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmitMy)} noValidate>
        <Stack spacing={2} width={400}>
          <TextField
            label="Email"
            type="email"
            {...register("email", {
              required: "Email field is required!",
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            type="password"
            {...register("password", {
              required: "Password field is required!",
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </Stack>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YoutubeFormWithMUI;
