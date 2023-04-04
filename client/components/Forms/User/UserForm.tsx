import React, { useEffect, useMemo } from "react";

import { Button } from "@roketid/windmill-react-ui";

import GroupInput from "~/components/FormInputs/GroupInput";
import { useForm } from "react-hook-form";
// import { storeCountry } from "~/store/serviceCountries/serviceCountriesSlice";
import { toast } from "react-hot-toast";
import { useAppDispatch } from "~/hooks/appStore";
import { fetchUsers, storeUser, updateUser } from "~/store/users/usersSlice";
import SearchSelect from "~/components/FormInputs/SearchSelect";
import { useUsers } from "~/hooks/users";
import HrWithTitle from "~/components/HrWithTitle";
import SelectImage from "~/components/FormInputs/SelectImage";

export default function UserForm({
  user = null,
  border = true,
  mutate = null,
}) {
  const dispatch = useAppDispatch();

  const { userRoles, userRolesLoading } = useUsers();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: useMemo(() => {
      return (
        user || {
          name: "",
          email: "",
          password: "",
          roles: [],
          image: "",
          email_verified_at: "",
        }
      );
    }, [user]),
  });
  useEffect(() => {
    reset(user);
  }, [user]);
  function onSubmit(data) {
    // return console.log(data);
    toast.promise(
      dispatch(user ? updateUser({ ...data }) : storeUser({ ...data })),
      {
        loading: "Loading",
        success: (res) => {
          !user && reset(user);
          mutate && mutate();
          return user ? "Updated" : "Created";
        },
        error: (res) => {
          console.log(res);
          return res.response?.data?.message;
        },
      }
    );
  }
  return (
    <div>
      <div
        className={`px-4 py-3 mb-8 ${
          border ? "bg-white rounded-lg shadow-md" : ""
        } dark:bg-gray-800`}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-6 gap-4"
        >
          <SelectImage
            label="Profile Image"
            name="image"
            setValue={setValue}
            value={watch("image")}
          />
          <GroupInput
            label="Name"
            divClass="col-span-6"
            register={register}
            options={{ required: true }}
            error={errors.name && "this field is required"}
            name="name"
          />
          <GroupInput
            type="email"
            label="Email"
            divClass="col-span-6"
            register={register}
            options={{ required: true }}
            name="email"
            disabled={user}
          />
          <GroupInput
            type="text"
            label="Password"
            helper={
              user && "Leave Blank if you don't want to change the password"
            }
            divClass="col-span-6"
            register={register}
            name="password"
          />
          <div className="col-span-6">
            <SearchSelect
              isMulti
              options={userRoles}
              isLoading={userRolesLoading}
              label="Roles"
              required
              value={watch("roles")}
              onChange={(roles) => setValue("roles", roles)}
            />
          </div>
          <GroupInput
            type="checkbox"
            label="email verified"
            divClass="col-span-6"
            register={register}
            onChange={(e) =>
              setValue(
                "email_verified_at",
                watch("email_verified_at")
                  ? watch("email_verified_at")
                  : "false"
              )
            }
            name="email_verified_at"
          />
          <div className="col-span-6 text-end">
            <Button type="submit" className="mt-3 text-end">
              {user ? "Update" : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
