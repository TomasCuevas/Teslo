import Head from "next/head";

//* components *//
import { Navbar, Sidebar } from "../";

//* interface *//
interface Props {
  children: React.ReactNode;
  title: string;
  pageDescription: string;
  imageFullUrl?: string;
}

export const ShopLayout: React.FC<Props> = ({
  children,
  title,
  pageDescription,
  imageFullUrl,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />
        {imageFullUrl && <meta name="og:image" content={imageFullUrl} />}
      </Head>

      <Navbar />
      <Sidebar />

      <main className="my-[20px] mx-auto max-w-[1440px] overflow-hidden px-[30px]">
        {children}
      </main>
    </>
  );
};
