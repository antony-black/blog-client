type TCountInfo = {
  count: number;
  title: string;
};

export const CountInfo: React.FC<TCountInfo> = ({ title, count = 0 }) => {
  return (
    <div className="flex flex-col items-center space-x-2 p-4">
      <span className="text-4xl font-semibold">{count}</span>
      <span>{title}</span>
    </div>
  );
};
