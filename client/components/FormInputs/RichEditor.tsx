import { useMemo, useRef, useState } from "react";
import React, { Fragment } from "react";
import Editor from "react-simple-code-editor";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";
import dynamic from "next/dynamic";
import { Button, Card, Label } from "@roketid/windmill-react-ui";
const JoditEditor = dynamic(import("jodit-react"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});
const RichEditor = ({
  value,
  onChange,
  label = null,
  required = null,
  placeholder = null,
}) => {
  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/doc/,
      placeholder: placeholder || "Start typings...",
    }),
    [placeholder]
  );

  return (
    <div className="relative">
      {label && (
        <Label className="mb-1 capitalize">
          {label}{" "}
          {required && <span className="font-bold text-red-600">*</span>}
        </Label>
      )}
      <JoditEditor
        value={value || " "}
        config={config}
        onBlur={(newContent) => onChange(newContent)} // preferred to use only this option to update the content for performance reasons
        // onChange={(newContent) => onChange(newContent)}
      />
    </div>
  );
};
export default RichEditor;
