import { useRouter } from "next/router";
import NextLink from "next/link";

//* interface *//
interface Props {
  href: string;
  title: string;
}

export const NavbarLink: React.FC<Props> = ({ href, title }) => {
  const { pathname } = useRouter();

  return (
    <NextLink href={href} passHref>
      <a
        className={
          pathname === href
            ? "flex items-center rounded-lg bg-primary px-3 py-[6px] text-white transition-all duration-500"
            : "flex items-center rounded-lg px-3 py-[6px] text-primary transition-all duration-500 hover:bg-light_gray"
        }
      >
        <span className="text-xs font-medium">{title}</span>
      </a>
    </NextLink>
  );
};
