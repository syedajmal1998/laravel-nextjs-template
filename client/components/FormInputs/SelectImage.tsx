import { useDropzone } from "react-dropzone";
import { ChangeEventHandler, FocusEventHandler, FC } from "react";
import React, { useEffect, useState } from "react";
import uuid from "react-uuid";
import GroupInput from "./GroupInput";
import Image from "next/image";
import { convertToSlug, makeFileUrl } from "~/utils/helpers";
import { Button, Label } from "@roketid/windmill-react-ui";

const SelectImage: FC<{
  setValue: Function;
  error?: string;
  name?: string;
  value?: any;
  label?: any;
  required?: any;
}> = ({ setValue, error, name, value, required, label, ...rest }) => {
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    multiple: false,
    onDrop: (acceptedFiles) => {
      setValue(name, URL.createObjectURL(acceptedFiles[0]));
      setValue("new_" + name, acceptedFiles[0]);
    },
    accept: {
      "image/*": [],
    },
    ...rest,
  });

  return (
    <div className="col-span-full">
      {label && (
        <Label className="mb-1 capitalize">
          {label}{" "}
          {required && <span className="font-bold text-red-600">*</span>}
        </Label>
      )}
      {value ? (
        <>
          <div className="mt-2">
            <img
              className="block object-cover w-20 h-20 rounded-full"
              src={value}
            ></img>
          </div>
          <Button
            layout="outline"
            type="button"
            className="block mt-2"
            onClick={(e) => console.log(setValue(name, ""))}
          >
            Remove Photo
          </Button>
        </>
      ) : (
        <div
          {...getRootProps({
            className:
              "flex flex-col col-span-full items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600",
          })}
        >
          <input
            {...getInputProps({
              id: uuid(),
            })}
          />

          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-10 h-10 mb-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload Image</span> or
              drag and drop
            </p>
            {/* <p className="text-xs text-gray-500 dark:text-gray-400">
        SVG, PNG, JPG or GIF (MAX. 800x400px)
      </p> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectImage;
