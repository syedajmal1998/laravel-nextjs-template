import React from "react";
import PageTitle from "@/components/Typography/PageTitle";
import SectionTitle from "@/components/Typography/SectionTitle";

import Layout from "~/containers/Layout";
import { MailIcon } from "icons";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import UserForm from "~/components/Forms/User/UserForm";
export const getServerSideProps: GetServerSideProps = async ({
  params: { createOrEdit, warehouse },
}) => {
  // @ts-ignore
  if (createOrEdit && createOrEdit == "create") {
    return {
      props: {
        createOrEdit,
      },
    };
  }
  return {
    notFound: true,
  };
};

function index({ createOrEdit, serviceCountry }) {
  return (
    <Layout>
      <PageTitle>Create Service Country</PageTitle>
      <UserForm />
    </Layout>
  );
}

export default index;
