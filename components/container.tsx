type ContainerProps = {
  children: React.ReactNode;
  wide?: boolean;
};

export default function Container({ children, wide }: ContainerProps) {
  return (
    <div className={`container m-auto px-6 sm:px-8 ${wide ? "max-w-6xl" : "max-w-2xl"}`}>
      {children}
    </div>
  );
}
