/////////////////////////
//// npm i yup @hookform/resolvers
////
/////////////////////////

import { useForm, useFieldArray } from "react-hook-form"; // useFieldArray працює лише з обєктами в масиві, не пхай в масив просто стрічки
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  username: yup.string().required("Username is required!"),
  email: yup
    .string()
    .email("Email format is not valid!")
    .required("Username is required!"),
  channel: yup.string().required("Channel is required!"),
});

const YoutubeFormWithYUP = () => {
  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      channel: "",
    },
    resolver: yupResolver(schema),
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
      <h1>TouTube Form with Yup </h1>

      <form
        onSubmit={handleSubmit(onSubmitMy)}
        noValidate // тепер не браузер валідує форму а useForm
      >
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" {...register("username")} />
          <p className="error">{errors.username?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" {...register("email")} />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input type="text" id="channel" {...register("channel")} />
          <p className="error">{errors.channel?.message}</p>
        </div>
        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YoutubeFormWithYUP;
