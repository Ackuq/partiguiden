import FlowAd from "./flow-ad";

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
