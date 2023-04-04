import { Label } from "@roketid/windmill-react-ui";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import uuid from "react-uuid";
export default function SearchSelect({
  options,
  onChange,
  creatable = false,
  value,
  label = "",
  required = false,
  placeholder = "Search",
  ...etc
}) {
  const [labeledOptions, setLabeledOptions] = useState([]);
  useEffect(() => {
    options && options?.some((o) => typeof o == "string")
      ? setLabeledOptions(
          options?.map((o) => ({ label: o, value: o, toString: () => uuid() }))
        )
      : setLabeledOptions(
          options?.map((o) => ({ ...o, toString: () => uuid() }))
        );
  }, [options]);
  function handleOnChange(e) {
    onChange(Array.isArray(e) ? e.map((e) => e?.value).flat() : e?.value);
  }

  return (
    <div>
      {label && (
        <Label>
          {label}{" "}
          {required && <span className="font-bold text-red-600">*</span>}
        </Label>
      )}
      {creatable ? (
        <CreatableSelect
          placeholder={placeholder}
          classNamePrefix="my-react-select"
          isClearable
          {...etc}
          value={
            value &&
            (Array.isArray(value)
              ? value.map((value) => ({
                  value,
                  label: labeledOptions?.find((o) => o.value == value)?.label,
                }))
              : {
                  value,
                  label: labeledOptions?.find((o) => o.value == value)?.label,
                })
          }
          className={`block w-full ${
            label ? "mt-1" : ""
          } my-react-select-container`}
          options={labeledOptions}
          onChange={handleOnChange}
        />
      ) : (
        <Select
          placeholder={placeholder}
          classNamePrefix="my-react-select"
          isClearable
          {...etc}
          value={
            value &&
            (Array.isArray(value)
              ? value.map((value) => ({
                  value,
                  label: labeledOptions?.find((o) => o.value == value)?.label,
                }))
              : {
                  value,
                  label: labeledOptions?.find((o) => o.value == value)?.label,
                })
          }
          className={`block w-full ${
            label ? "mt-1" : ""
          } my-react-select-container`}
          options={labeledOptions}
          onChange={handleOnChange}
        />
      )}
    </div>
  );
}
