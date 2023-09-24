interface DividerProps {
  className?: string;
}

export const Divider = ({ className = "" }: DividerProps) => {
  return (
    <hr className={`border-slate-400 dark:border-slate-600 ${className}`} />
  );
};
