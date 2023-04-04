// import useSWRImmutable from "swr";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ParsedUrlQuery, stringify } from "querystring";
import axios, { csrf } from "lib/axios";
import { toast } from "react-hot-toast";
import useSWRImmutable from 'swr/immutable'
import {
  fetchUserRoles,
} from "~/services/users";

export const useUsers = () => {
  const {
    data: userRoles,
    isLoading: userRolesLoading,
    error: userRolesError,
    mutate: userRolesMutate,
  } = useSWRImmutable("/autocomplete/user_roles", fetchUserRoles);
  return {
    userRoles,
    userRolesLoading,
    userRolesError,
  };
};
