type ContainerProps = {
  children: React.ReactNode;
  wide?: boolean;
};

export default function Container({ children, wide }: ContainerProps) {
  return (
    <div className={`container m-auto px-6 ${wide ? 'max-w-5xl' : 'max-w-2xl'}`}>
      {children}
    </div>
  );
}
