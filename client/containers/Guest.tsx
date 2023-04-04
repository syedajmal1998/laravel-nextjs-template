import { useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/store/store";
import { useRouter } from "next/router";
import Loading from "~/components/Loading";
import { useAuth } from "~/hooks/auth";

interface ILayout {
  children: React.ReactNode;
}

function Guest({ children }: ILayout) {
  const { user, apiLoading, loading, logout, login } = useAuth({
    middleware: "guest",
  });
  return (
    <>
      {loading || apiLoading ? (
        <Loading
          show
          classes="!bg-white !opacity-100"
          mClasses="!text-gray-700"
        />
      ) : (
        children
      )}
    </>
  );
}

export default Guest;
