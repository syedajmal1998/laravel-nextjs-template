import React, { useState, useEffect } from "react";

import PageTitle from "@/components/Typography/PageTitle";
import { Badge, Avatar, Button } from "@roketid/windmill-react-ui";
import { EditIcon, TrashIcon } from "icons";

import Layout from "~/containers/Layout";
import DataTable from "~/components/DataTable";
import { _capitalize } from "chart.js/dist/helpers/helpers.core";
import { useRouter } from "next/router";
import UserForm from "~/components/Forms/User/UserForm";
import { RootState } from "~/store/store";
import { toast } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "~/hooks/appStore";
import { deleteUser, fetchUsers, usersType } from "~/store/users/usersSlice";
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "use-query-params";
function UserIndex() {
  const [addUser, setAddUser] = useState(false);
  const [editUser, setEditUser] = useState();
  const dispatch = useAppDispatch();
  const [query, setQuery] = useQueryParams({
    q: StringParam,
    page: withDefault(NumberParam, 1),
  });
  const users = useAppSelector<typeof usersType>(
    (state: RootState) => state.users
  );
  useEffect(() => {
    toast.promise(dispatch(fetchUsers({ ...query, fresh: true })), {
      loading: "Loading",
      success: "loaded",
      error: "Error",
    });
  }, [query]);
  const columns = React.useMemo(
    () => [
      {
        Header: "#",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ row: { original } }) => {
          return (
            <div className="flex items-center gap-3">
              <Avatar
                className="align-middle"
                src={
                  original?.image
                    ? original?.image
                    : original?.profile_photo_url
                }
                alt=""
                aria-hidden="true"
              />
              <div>
                <p className="text-gray-700 dark:text-gray-100">
                  {original.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {original.email}
                </p>
              </div>
            </div>
          );
        },
      },
      {
        Header: "Roles",
        accessor: "role",
        Cell: ({ row: { original } }) => {
          return (
            <div className="flex flex-col items-start justify-start gap-3">
              {original.roles.map((role) => (
                <Badge key={role} type="neutral">
                  {role}
                </Badge>
              ))}
            </div>
          );
        },
      },
      {
        Header: "Verified At",
        accessor: "email_verified_at",
        Cell: ({ row: { original } }) => {
          return (
            <div className="flex flex-col items-start justify-start gap-3">
              {original.email_verified_at ? (
                <Badge type="success">Yes</Badge>
              ) : (
                <Badge type="warning">No</Badge>
              )}
            </div>
          );
        },
      },
      {
        Header: "Actions",
        Cell: ({ row: { original } }) => {
          return (
            <div className="flex items-center space-x-4">
              <Button
                layout="link"
                size="small"
                aria-label="Edit"
                onClick={(e) => {
                  setEditUser(original);
                }}
              >
                <EditIcon className="w-5 h-5" aria-hidden="true" />
              </Button>
              <Button
                layout="link"
                size="small"
                aria-label="Delete"
                onClick={(e) => {
                  setEditUser(undefined);
                  toast.promise(dispatch(deleteUser(original.id)), {
                    loading: "loading...",
                    success: () => {
                      dispatch(fetchUsers({ ...query, fresh: true }));
                      return "deleted";
                    },
                    error: "error",
                  });
                }}
              >
                <TrashIcon className="w-5 h-5" aria-hidden="true" />
              </Button>
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <Layout>
      <PageTitle>Users</PageTitle>
      <div className="flex justify-end gap-3 mb-6">
        <Button onClick={(e) => setAddUser(!addUser)}>
          {addUser ? "Close" : "Add User"}
        </Button>
        {/* <Button onClick={(e) => setImportUser(!importUser)}>
          {importUser ? "Close" : "Import Users"}
        </Button> */}
      </div>
      {editUser && (
        <div className="mb-1 text-end">
          <Button size="small" onClick={(e) => setEditUser(undefined)}>
            New
          </Button>
        </div>
      )}
      {(addUser || editUser) && <UserForm user={editUser} key={editUser} />}
      <DataTable
        columns={columns}
        data={users?.data}
        links={users?.links}
        meta={users?.meta}
      />
    </Layout>
  );
}

export default UserIndex;
