type ContainerProps = {
  children: React.ReactNode;
  wide?: boolean;
  narrow?: boolean;
};

export default function Container({ children, wide, narrow }: ContainerProps) {
  const maxWidth = narrow ? "max-w-2xl" : wide ? "max-w-4xl" : "max-w-2xl";

  return (
    <div className={`container m-auto px-6 sm:px-8 ${maxWidth}`}>
      {children}
    </div>
  );
}
