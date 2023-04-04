import { Button, Input, Label } from "@roketid/windmill-react-ui";
import { useRouter } from "next/router";
import React, { FC, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";
import uuid from "react-uuid";
import { useAppDispatch } from "~/hooks/appStore";
import { importProducts } from "~/store/products/productsSlice";

const SelectAttachments: FC<{
  setValue: Function;
  error?: string;
  name?: string;
  value?: any;
  label?: string;
}> = ({ setValue, error, name, value, label }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [portalWay, setPortalWay] = useState(false);
  const [clearProducts, setClearProducts] = useState(false);
  const dispatch = useAppDispatch();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setValue(
      name,
      acceptedFiles.map((file) => file.name)
    );
    setValue("new_" + name, acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted: onDrop,
  });
  console.log(files);
  // ts-ignore
  const acceptedFileItems =
    value.length != 0 &&
    value.map((file) => (
      // @ts-ignore
      <li key={file}>{file}</li>
    ));
  function onImportSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    toast.promise(dispatch(importProducts({ files, portalWay })), {
      loading: "Loading",
      success: (res) => {
        setFiles([]);
        return "Imported";
      },
      error: (res) => {
        return res.response?.data?.message;
      },
    });
  }
  return (
    <div className="col-span-full">
      <form onSubmit={onImportSubmit}>
        <div
          {...getRootProps()}
          className={`p-5 text-center border border-dashed rounded-md active:border-indigo-600 transition-all text-gray-400 ${
            isDragActive ? "border-gray-400" : ""
          }`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <>
              <p>
                {label ||
                  "Drag & drop some files here, or click to select files"}
              </p>
            </>
          )}
        </div>
        <aside>
          <h4 className="font-bold capitalize">{name || "Accepted files"}</h4>
          <ul>{acceptedFileItems}</ul>
        </aside>
      </form>
    </div>
  );
};

export default SelectAttachments;
