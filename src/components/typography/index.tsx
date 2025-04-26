type TTypography = {
  children: string;
  size?: string;
};

export const Typography: React.FC<TTypography> = ({
  children,
  size = "text-xl",
}) => {
  return <p className={size}>{children}</p>;
};
