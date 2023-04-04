import { Switch } from "@headlessui/react";
import React from "react";

export default function CustomSwitch({ checked, onChange, ...etc }) {
  return (
    <Switch
      {...etc}
      checked={checked}
      onChange={onChange}
      className={`${
        checked ? "bg-indigo-600" : "bg-gray-200"
      } relative inline-flex h-5 w-8 items-center rounded-full`}
    >
      <span
        className={`${
          checked ? "translate-x-4" : "translate-x-1"
        } inline-block h-3 w-3 transform rounded-full bg-white transition`}
      />
    </Switch>
  );
}
