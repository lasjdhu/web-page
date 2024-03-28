export default function CompanyBox({
  img,
  company,
  spec,
  location,
  yrs,
}: {
  img?: string;
  company: string;
  spec: string;
  location: string;
  yrs: string;
}) {
  return (
    <div className="flex items-center">
      {img && (
        <img
          src={img}
          alt="logo"
          loading="lazy"
          className="w-20 h-auto mr-10"
        />
      )}
      <div>
        <h2 className="text-2xl font-bold tracking-widest text-white">
          {company}
        </h2>
        <p>{spec}</p>
        <p className="font-thin text-foreground">{location}</p>
        <p className="font-thin text-foreground">{yrs}</p>
      </div>
    </div>
  );
}
