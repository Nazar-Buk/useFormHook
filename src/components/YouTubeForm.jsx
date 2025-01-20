////////////////////////////////
////////// npm install react-hook-form
////////// npm install -D @hookform/devtools
///////////////////////////////////

import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let renderCount = 0;

const YouTubeForm = () => {
  const form = useForm();
  const { register, control, handleSubmit, formState } = form; // register -- дозволяє контролювати форму
  //   const { name, ref, onChange, onBlur } = register("username"); // це коментуємо а в Username пишемо {...register('username')}

  const { errors } = formState;

  const onSubmitMy = (data) => {
    console.log(data, "Form Submitted!");
  };

  renderCount++;

  return (
    <div>
      <h1>TouTube Form ({renderCount / 2})</h1>
      <form
        onSubmit={handleSubmit(onSubmitMy)}
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

        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YouTubeForm;
