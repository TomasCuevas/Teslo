//* interface *//
interface Props {
  icon: any;
  title: string;
  onClick: () => void;
}

export const SidebarButton: React.FC<Props> = ({
  icon: Icon,
  title,
  onClick,
}) => {
  return (
    <li
      onClick={onClick}
      className="cursor-pointer py-2 px-[5%] transition-all duration-300 hover:bg-light_gray"
    >
      <div className="flex items-center gap-5">
        <Icon className="text-gray" />
        <span className="text-sm font-medium text-gray">{title}</span>
      </div>
    </li>
  );
};
