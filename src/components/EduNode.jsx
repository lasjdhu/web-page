export default function EduNode(props) {
  return (
    <div className="lg:w-1/3 lg:flex justify-center items-center">
      {props.img_left && (
        <img
          src={props.img_left}
          alt="logo"
          loading="lazy"
          className="h-20 w-auto lg:mx-10 mx-auto lg:mt-0 m-5"
        />
      )}
      <div>
        <h2 className="text-2xl text-white text-center font-bold mb-2 tracking-widest">
          {props.school}
        </h2>
        <p className="text-foreground text-center">{props.place}</p>
        <p className="text-foreground text-center">{props.yrs}</p>
        <p className="text-foreground text-center">{props.spec}</p>
      </div>
      {props.img_right && (
        <img
          src={props.img_right}
          alt="logo"
          loading="lazy"
          className="h-20 w-auto lg:mx-10 mx-auto lg:mt-0 m-5"
        />
      )}
    </div>
  );
}
