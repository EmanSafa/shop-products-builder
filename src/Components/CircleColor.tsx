interface IProps extends React.HTMLAttributes<HTMLSpanElement> {
  color: string;
}

const CircleColor = ({ color, ...rest }: IProps) => {
  return (
    <span
      className={`w-6 h-6 rounded-full  cursor-pointer`}
      style={{ background: color }}
      {...rest}
    ></span>
  );
};

export default CircleColor;
