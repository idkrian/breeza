interface Props {
  title: string;
  text?: string;
  text2?: string;
  subtitle?: string;
  subtitle2?: string;
}
const Card = ({ title, text, text2, subtitle, subtitle2 }: Props) => {
  return (
    <div className="bg-blue rounded-xl p-6 mx-2 my-4 2xl:mx-3 px-4 text-white flex flex-col justify-center">
      <p>{title}</p>
      <p className="text-2xl 2xl:text-3xl ">{text}</p>
      <p className="text-3xl">{text2}</p>
      <p>{subtitle}</p>
      <p>{subtitle2}</p>
    </div>
  );
};

export default Card;
