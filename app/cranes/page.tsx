type craneProps = {
  type: string;
  title: string;
};

const page = ({ type, title }: craneProps) => {
  return (
    <div
      className="relative h-screen flex items-center justify-center text-center px-4"
      id="cranes-page"
    >
      {title}
    </div>
  );
};

export default page;
