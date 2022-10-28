import Head from "next/head";

//* components *//
import { Sidebar, AdminNavbar } from "../";

//* interfaces *//
interface Props {
  children: React.ReactNode;
  icon?: React.ReactNode;
  imageFullUrl?: string;
  pageDescription: string;
  subtitle: string;
  title: string;
}

export const AdminLayout: React.FC<Props> = ({
  children,
  icon,
  imageFullUrl,
  pageDescription,
  subtitle,
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

      <AdminNavbar />
      <Sidebar />

      <main className="my-[20px] mx-auto max-w-[1440px] overflow-hidden px-[30px]">
        <div className="flex animate-fadeIn flex-col">
          <h1 className="text-xl font-bold text-primary md:text-2xl lg:text-3xl">
            {icon} {"   "} {title}
          </h1>
          <h2 className="text-lg text-gray md:text-xl lg:text-2xl">
            {subtitle}
          </h2>
        </div>
        {children}
      </main>
    </>
  );
};
