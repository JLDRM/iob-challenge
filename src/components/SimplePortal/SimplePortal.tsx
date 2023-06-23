import React, { PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import cross from './black-cross.svg';
import './SimplePortal.css';

export interface SimplePortalProps extends PropsWithChildren {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SimplePortal = ({ open, setOpen, children }: SimplePortalProps): JSX.Element => {
  return (
    <>
      {open && createPortal(<div className="SimplePortal">
        <div className="Modal" >
          <button className="buttonClose" onClick={() => setOpen(prev => !prev)} type="button">
            <img src={cross} alt="close simple portal" />
          </button>

          {children}

        </div>
      </div>, document.body)}
    </>
  );
};

export default SimplePortal;