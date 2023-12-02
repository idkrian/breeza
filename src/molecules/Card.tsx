interface Props {
  title: string;
  text: string;
  subtitle?: string;
}
const Card = ({ title, text, subtitle }: Props) => {
  return (
    <div className="bg-blue rounded-xl p-6">
      <p>{title}</p>
      <p className="text-3xl">{text}</p>
      <p>{subtitle}</p>
    </div>
  );
};

export default Card;
