import Head from "next/head";

//* components *//
import { FullScreenLoading } from "../";

//* interfaces *//
interface Props {
  title: string;
}

export const LoadingLayout: React.FC<Props> = ({ title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/logo.svg"></link>
      </Head>

      <main>
        <FullScreenLoading />
      </main>
    </>
  );
};
