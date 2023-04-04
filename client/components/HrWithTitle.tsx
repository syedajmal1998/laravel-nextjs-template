import React from "react";

export default function HrWithTitle({ title = null }) {
  return (
    <div className="relative inline-flex items-center justify-center w-full col-span-full">
      <hr className="w-full h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
      {title && (
        <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">
          {title}
        </span>
      )}
    </div>
  );
}
