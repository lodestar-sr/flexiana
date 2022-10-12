import React, {FC, ReactElement} from "react";
import classNames from "classnames";
import "./style.css";

export interface IModalProps {
  className?: string;
  title: string;
  children: ReactElement;
  onClose(): void;
}

export const Modal: FC<IModalProps> = ({
  className,
  title,
  children,
  onClose,
}) => {
  return (
    <div className={classNames("modal-wrapper", className)}>
      <div className="backdrop" onClick={onClose} />
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title">{title}</div>
          <i className="close fa fa-times" onClick={onClose} />
        </div>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
};
