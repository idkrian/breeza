interface Props {
  title: string;
  text?: string;
  text2?: string;
  subtitle1?: string;
  subtitle2?: string;
}
const Card = ({ title, text, text2, subtitle1, subtitle2 }: Props) => {
  return (
    <div className="bg-blue rounded-xl p-6 m-4 text-white flex flex-col justify-center">
      <p>{title}</p>
      <p className="text-3xl">{text}</p>
      <p className="text-3xl">{text2}</p>
      <p>{subtitle1}</p>
      <p>{subtitle2}</p>
    </div>
  );
};

export default Card;
