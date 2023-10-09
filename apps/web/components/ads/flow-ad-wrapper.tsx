import dynamic from "next/dynamic";

const FlowAd = dynamic(() => import("./flow-ad"), { ssr: false });

type Props = React.PropsWithChildren<{
  index: number;
}>;

export default function FlowAdWrapper({ children, index }: Props) {
  return (
    <>
      {index === 0 && <FlowAd />}
      {children}
      {(index + 1) % 10 === 0 && <FlowAd />}
    </>
  );
}
