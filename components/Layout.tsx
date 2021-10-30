import { FC } from "react";
import { Box } from "@chakra-ui/react";
import Head from "next/head";

type LayoutProps = {
  title?: string;
};

const Layout: FC<LayoutProps> = ({ title = "MetaSkill", children }) => {
  return (
    <Box minH="100vh" bg="gray.700" color="gray.50" p="4">
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="MetaSkill, a site to test your it skills."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{children}</main>
    </Box>
  );
};

export default Layout;
