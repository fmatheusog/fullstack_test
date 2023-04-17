import { FunctionComponent, ReactNode } from "react";

interface Props {
  children: ReactNode,
}

export const ProductList: FunctionComponent<Props> = (props: Props) => {
  const { children } = props;

  return (
    <>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1">
        { children }
      </div>
    </>
  )
}