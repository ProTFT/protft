import { Suspense } from "react";

interface SuspenseElementProps {
  element: JSX.Element;
}

const GenericLoader = () => <div></div>;

export const SuspenseElement = ({ element }: SuspenseElementProps) => (
  <Suspense fallback={<GenericLoader />}>{element}</Suspense>
);
