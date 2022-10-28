import NextLink from "next/link";
import { useContext } from "react";

//* context *//
import { UiContext } from "../../../context/ui/UiContext";

//* interface *//
interface Props {
  href: string;
  icon: any;
  title: string;
}

export const SidebarLink: React.FC<Props> = ({ icon: Icon, href, title }) => {
  const { onToggleMenu } = useContext(UiContext);

  return (
    <li className="py-2 px-[5%] transition-all duration-300 hover:bg-light_gray">
      <NextLink href={href}>
        <a
          onClick={() => onToggleMenu(false)}
          className="flex items-center gap-5"
        >
          <Icon className="text-gray" />
          <span className="text-sm font-medium text-gray">{title}</span>
        </a>
      </NextLink>
    </li>
  );
};
