////////////////////////////////
////////// npm install react-hook-form
////////// npm install -D @hookform/devtools
///////////////////////////////////

import { useForm, useFieldArray } from "react-hook-form"; // useFieldArray працює лише з обєктами в масиві, не пхай в масив просто стрічки
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";

let renderCount = 0;

const YouTubeForm = () => {
  const form = useForm({
    // defaultValues: {
    //   username: "Batman",
    //   email: "",
    //   channel: "",
    // },

    // defaultValues: async () => {
    //   const response = await fetch(
    //     "https://jsonplaceholder.typicode.com/users/1"
    //   );
    //   const data = await response.json();

    //   return {
    //     username: "Batman",
    //     email: data.email,
    //     channel: "",
    //   };
    // },

    defaultValues: {
      username: "Batman",
      email: "",
      channel: "",
      social: {
        twitter: "",
        facebook: "",
      },
      phoneNumbers: ["", ""],
      phNumbers: [{ number: "" }],
      age: 0,
      dob: new Date(),
    },
    // mode: 'onSubmit',
    // mode: "onBlur",
    // mode: "onTouched", // в перше спрацює на блюр, а наступні рази при onChange поля
    // mode: "onChange", // може бути багато ререндерів, та це вплине на перформанс
    mode: "all", // і на onBlur і на onChange
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
  } = form; // register -- дозволяє контролювати форму,
  // getValues -- не робить перерендери і підписки на onChange, використовуй для кнопок із onClick, для getValues не треба watch

  //   const { name, ref, onChange, onBlur } = register("username"); // це коментуємо а в Username пишемо {...register('username')}

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
  } = formState; // isDirty показує чи я щось міняв у полях форми,
  //  якщо міняв то true, якщо все повернув назад то false, використовуй щоб дізейблити кнопку відправки.
  //   console.log(touchedFields, "touchedFields");
  //   console.log(dirtyFields, "dirtyFields");
  //   console.log(isDirty, "isDirty");
  //   console.log(isValid, "isValid"); // isValid -- дуже розумна штука, перевіряє чи всі всі поля валідні, якщо так то true,
  // якщо  хоча б одне не валідне то буде false

  console.log(isSubmitting, "isSubmitting");
  console.log(isSubmitted, "isSubmitted");
  console.log(isSubmitSuccessful, "isSubmitSuccessful");
  console.log(submitCount, "submitCount");

  const { fields, append, remove } = useFieldArray({
    // useFieldArray дозволяє зробити функціонал де додаються поля при кліку на кнопку
    name: "phNumbers",
    control,
  });

  const onSubmitMy = (data) => {
    console.log(data, "Form Submitted!");
    // не рекомендовано використовувати  цій фн reset
  };

  const onErrorMy = (errors) => {
    // викличеться коли форма фейланеться
    console.log(errors, "submit errors");
  };

  const handleGetValues = () => {
    // console.log(getValues(), "Get values");
    // console.log(getValues("social"), "Get values"); // дасть значення що є в social
    // console.log(getValues("social.twitter"), "Get values"); // дасть значення що є в social.twitter
    console.log(getValues(["username", "channel"]), "Get values"); // дасть значення що є в username та channel масивом
  };

  const handleSetValue = () => {
    // setValue("username", ""); // змінить  value в username на '', другим параметром ми можемо передати те що має потрапити в поле
    // Увага! setValue не впливає на Touched чи Dirty чи валідацію, щоб цього уникнути пиши третій параметр як описано нижче
    setValue("username", "", {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    }); // тепер setValue  ВПЛИВАЄ на Touched чи Dirty чи валідацію
  };

  renderCount++;

  //   const watchUsername = watch("username"); // watch вміє викликати рендер, це щось типу того ніби ми прикрутилиб до поля useState
  //   const watchUsername = watch(["username", "email"]); //  так можна дивитися за двома полями чи більше

  //   const watchForm = watch(); // відслідковується ціла форма, це погано впливає напродуктивність
  // JSON.stringify(watchForm) ось так використовувати
  // якщо жити не можеш без watch, то помісти його в useEffect і буде тобі щастя і не буде перерендера, глянь в консоль, при кожній зміні ми виводимо лог

  //   useEffect(() => {
  //     const subscription = watch((value) => {
  //       console.log(value, "watch value");
  //     });

  //     return () => subscription.unsubscribe();
  //   }, [watch]);

  console.log(errors, "errors");

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(); // так треба робити, правда чогось збиваються настройки isSubmitted, isSubmitSuccessful, submitCount
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div>
      <h1>TouTube Form ({renderCount / 2})</h1>
      {/* <h2>Watched value: {watchUsername}</h2> */}
      {/* <h2>Watched value: {JSON.stringify(watchForm)}</h2> */}
      <form
        onSubmit={handleSubmit(onSubmitMy, onErrorMy)}
        noValidate // тепер не браузер валідує форму а useForm
      >
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            //   name={name}
            //   ref={ref}
            //   onChange={onChange}
            //   onBlur={onBlur}
            // замість цього всього пишемо {...register('username')}
            //   {...register("username")} // тут ми контролюємо це поле (йoго стейт)
            {...register("username", {
              required: {
                value: true,
                message: "Username is requited",
              },
            })}
          />
          <p className="error">{errors.username?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            {...register("email", {
              pattern: {
                value:
                  /[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/,
                message: "Invalid email format",
              },
              validate: {
                notAdmin: (fieldValue) => {
                  // якщо валідація успішна то повертай true, якщо ні то поверни повідомлення із помилкою
                  return (
                    fieldValue !== "admin@example.com" ||
                    "Enter a different email address."
                  );
                },
                notBlackList: (fieldValue) => {
                  return (
                    // baddomain.com цей домен не дозволений
                    !fieldValue.endsWith("baddomain.com") ||
                    "This domain is not supported"
                  );
                },
                emailAvailable: async (fieldValue) => {
                  const response = await fetch(
                    `https://jsonplaceholder.typicode.com/users?email=${fieldValue}`
                  );
                  const data = await response.json();

                  return data.length == 0 || "Email already exist!";
                },
              },
            })}
          />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            {...register("channel", {
              required: {
                value: true,
                message: "Channel is required!",
              },
            })}
          />
          <p className="error">{errors.channel?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="twitter">Twitter</label>
          <input
            type="text"
            id="twitter"
            {...register("social.twitter", {
              disabled: true, // валідації відключаються якщо поле disabled, а його значення буде undefined
            })}
          />
        </div>

        <div className="form-control">
          <label htmlFor="facebook">Facebook</label>
          <input
            type="text"
            id="facebook"
            {...register("social.facebook", {
              disabled: watch("channel") === "", // дивиться чи не пусте поле channel, якщо пусте дізейблимо поле facebook
            })}
          />
        </div>

        <div className="form-control">
          <label htmlFor="primary-phone">Primary Phone Number</label>
          <input
            type="text"
            id="primary-phone"
            {...register("phoneNumbers.0", {
              required: {
                value: true,
                message: "This is required primary phone field",
              },
            })}
          />
          <p className="error">{errors.phoneNumbers?.[0]?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="secondary-phone">Secondary Phone Number</label>
          <input
            type="text"
            id="secondary-phone"
            {...register("phoneNumbers.1", {
              required: {
                value: true,
                message: "This is required secondary phone field",
              },
            })}
          />
          <p className="error">{errors.phoneNumbers?.[1]?.message}</p>
        </div>
        <div>
          <label htmlFor="">List of phone numbers</label>
          <div className="wrap-all-phone-numbers-fields">
            {fields.map((field, index) => (
              <div key={field.id} className="form-control">
                {/* <label htmlFor="secondary-phone">Secondary Phone Number</label> */}
                <input
                  type="text"
                  //   id="secondary-phone"
                  {...register(`phNumbers.${index}.number`)}
                />
                {index > 0 && (
                  <button type="button" onClick={() => remove(index)}>
                    Remove field
                  </button>
                )}
                {/* <p className="error">{errors.phoneNumbers?.[1].message}</p> */}
              </div>
            ))}
            <button type="button" onClick={() => append({ number: "" })}>
              Add extra fields
            </button>
          </div>
        </div>

        <div className="form-control">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            {...register("age", {
              valueAsNumber: true, // тепер форма буде відправляти ЧИСЛО
              required: {
                value: true,
                message: "Age is required!",
              },
            })}
          />
          <p className="error">{errors.age?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="dob">Date of birth</label>
          <input
            type="date"
            id="dob"
            {...register("dob", {
              valueAsDate: true,
              required: {
                value: true,
                message: "Date of birth is required!",
              },
            })}
          />
          <p className="error">{errors.dob?.message}</p>
        </div>

        {/* <button disabled={!isDirty || !isValid || isSubmitting}>Submit</button> */}
        <button>Submit</button>
        <button type="button" onClick={handleGetValues}>
          Get Values
        </button>
        <button type="button" onClick={handleSetValue}>
          Set Values
        </button>
        <button type="button" onClick={() => reset()}>
          Reset
        </button>
        <button
          type="button"
          //   onClick={() => trigger() /*ровалідує всі поля при кліку на кнопку*/}
          onClick={
            () =>
              trigger(
                "channel"
              ) /*ровалідує конкретне поле при кліку на кнопку*/
          }
        >
          Validate
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YouTubeForm;
