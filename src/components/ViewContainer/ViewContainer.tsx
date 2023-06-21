import { PropsWithChildren } from "react";
import './ViewContainer.css';

interface ViewContainerProps extends PropsWithChildren {
}

const ViewContainer = ({ children }: ViewContainerProps): JSX.Element => {
  return (
    <div className="ViewContainer">
      {children}
    </div>
  );
};

export default ViewContainer;