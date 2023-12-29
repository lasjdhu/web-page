export default function EduNode(props) {
  return (
    <div className="flex items-center">
      {props.img && (
        <img
          src={props.img}
          alt="logo"
          loading="lazy"
          className="w-20 h-auto mr-10"
        />
      )}
      <div>
        <h2 className="text-2xl text-white font-bold tracking-widest">
          {props.school}
        </h2>
        <p>{props.spec}</p>
        <p className="text-foreground font-thin">{props.place}</p>
        <p className="text-foreground font-thin">{props.yrs}</p>
      </div>
    </div>
  );
}
