//* interface *//
interface Props {
  title: string | number;
  subtitle: string;
  icon: React.ReactNode;
}

export const SummaryTile: React.FC<Props> = ({ icon, subtitle, title }) => {
  return (
    <>
      <article className="m-2 flex w-full gap-4 rounded-2xl py-4 px-2 shadow-md  shadow-primary/20  sm:w-[calc(50%_-_16px)] md:w-[calc(33%_-_16px)] lg:w-[calc(25%_-_16px)]">
        <div className="flex">{icon}</div>
        <div className="flex flex-col gap-2">
          <h3 className="text-5xl">{title}</h3>
          <span>{subtitle}</span>
        </div>
      </article>
    </>
  );
};
