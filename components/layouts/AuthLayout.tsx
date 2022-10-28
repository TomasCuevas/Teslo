import Head from "next/head";

//* interfaces *//
interface Props {
  children: React.ReactNode;
  imageFullUrl?: string;
  pageDescription: string;
  title: string;
}

export const AuthLayout: React.FC<Props> = ({
  children,
  imageFullUrl,
  pageDescription,
  title,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />
        {imageFullUrl && <meta name="og:image" content={imageFullUrl} />}
        <link rel="icon" href="/logo.svg"></link>
      </Head>

      <main className="flex h-[calc(100vh_-_200px)] items-center justify-center">
        {children}
      </main>
    </>
  );
};
