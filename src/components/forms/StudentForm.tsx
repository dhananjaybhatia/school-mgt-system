"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long." })
    .max(20, { message: "Username must not be more than 20 characters long." }),

  email: z.string().email({ message: "Invalid email address" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." }),

  firstname: z.string().min(1, { message: "First name is required." }),

  lastname: z.string().min(1, { message: "Last name is required." }),

  phone: z.string().min(1, { message: "Phone is required." }),

  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters long." }),

  dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date of birth.",
  }),
  gender: z.enum(["male", "female", "others"], {
    message: "Gender is required",
  }),
  img: z.instanceof(File, { message: "Image is required." }),
});

const StudentForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onsubmit = (data) => {
    console.log(data);
  };

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(onsubmit)}>
      <h1 className="text-2xl font-medium capitalize">Create a new student</h1>
      <span className="text-gray-400 text-sm font-medium">
        Authenticated Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="username"
          name="username"
          defaultValue={data?.username}
          register={register}
          error={errors.username}
        />
        <InputField
          label="email"
          name="email"
          defaultValue={data?.email}
          register={register}
          error={errors.email}
        />
        <InputField
          label="password"
          name="password"
          type="password"
          defaultValue={data?.password}
          register={register}
          error={errors.password}
        />
      </div>

      <span className="text-gray-400 text-sm font-medium">
        Personal Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="first name"
          name="firstName"
          defaultValue={data?.firstName}
          register={register}
          error={errors.firstname}
        />
        <InputField
          label="last name"
          name="lastname"
          defaultValue={data?.lastname}
          register={register}
          error={errors.lastname}
        />
        <InputField
          label="Phone"
          name="phone"
          defaultValue={data?.phone}
          register={register}
          error={errors.phone}
        />
        <InputField
          label="address"
          name="address"
          defaultValue={data?.address}
          register={register}
          error={errors.address}
        />
        <InputField
          label="date of Birth"
          name="dateOfBirth"
          defaultValue={data?.dateOfBirth}
          register={register}
          error={errors.dateOfBirth}
          type="date"
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-sm text-gray-600 capitalize">Gender</label>
          <select
            className="ring-[1.5px] ring-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 p-2 rounded-md text-sm w-full"
            {...register("gender")}
            defaultValue={data?.gender}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
          {errors.gender?.message && (
            <p className="text-xs text-red-600">{errors.gender?.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2 w-full md:w-1/4 mt-4">
          <label
            htmlFor="img"
            className="px-4 py-2 border-2 text-center border-dashed border-blue-400 rounded-md text-sm text-gray-600 hover:border-none hover:bg-green transition flex flex-row items-center gap-2"
          >
            <Image src="/upload.png" alt="" width={28} height={28} />{" "}
            <span>Upload Image</span>
          </label>
          <input type="file" {...register("img")} className="hidden" id="img" />
          {errors.img?.message && (
            <p className="text-xs text-red-600">{errors.img?.message}</p>
          )}
        </div>
      </div>

      <button className="bg-blue text-gray-900 font-medium text-lg p-2 rounded-md">
        {type === "create" ? "CREATE" : "UPDATE"}
      </button>
      <div></div>
    </form>
  );
};

export default StudentForm;
