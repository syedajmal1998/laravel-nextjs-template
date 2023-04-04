import { HelperText, Input, Label, Textarea } from "@roketid/windmill-react-ui";
import React from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";
import uuid from "react-uuid";
export interface IGroupInput extends React.ComponentPropsWithRef<"input"> {
  label?: string;
  helper?: string;
  error?: string;
  register?: UseFormRegister<any>;
  options?: RegisterOptions;
  divClass?: string;
  withButton?: boolean;
  buttonOnClick?: React.MouseEventHandler<HTMLButtonElement>;
  buttonLabel?: string;
}

export default function GroupInput({
  label,
  helper,
  error,
  divClass,
  type,
  name,
  required,
  register,
  buttonLabel,
  buttonOnClick,
  withButton,
  options = undefined,
  ...etc
}: IGroupInput) {
  return (
    <Label className={divClass + " relative pt-1"} check={type == "checkbox"}>
      {label && type != "checkbox" && (
        <span className="capitalize">
          {label}{" "}
          {options && options.required && (
            <span className="font-bold text-red-600">*</span>
          )}
        </span>
      )}
      {type != "textarea" && (
        <div className="relative">
          <Input
            valid={error && false}
            type={type}
            {...etc}
            {...(register ? register(name, options) : { name })}
          />
          {withButton && (
            <button
              type="button"
              onClick={buttonOnClick}
              className="absolute inset-y-0 right-0 px-4 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-r-md active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
            >
              {buttonLabel ? buttonLabel : "Click"}
            </button>
          )}
        </div>
      )}

      {type == "textarea" && (
        // @ts-ignore
        <Textarea
          rows={4}
          valid={error && false}
          {...etc}
          {...(register ? register(name, options) : { name })}
        />
      )}
      {label && type == "checkbox" && (
        <span className="ml-2 capitalize">
          {label}{" "}
          {options && options.required && (
            <span className="font-bold text-red-600">*</span>
          )}
        </span>
      )}
      {helper && <HelperText>{helper}</HelperText>}
      {error && <HelperText>{error}</HelperText>}
    </Label>
  );
}
