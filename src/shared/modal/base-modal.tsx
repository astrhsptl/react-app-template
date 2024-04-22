import clsx, { ClassValue } from 'clsx';
import { observer } from 'mobx-react-lite';
import { FC, ReactNode } from 'react';
import { ModalWindowStatement } from '..';
import { CurrentModalContext } from './context';

interface BaseModalProps {
  children: ReactNode;
  statement: ModalWindowStatement;
  className?: ClassValue;
  onClick?(event: React.MouseEvent): void;
}

export const BaseModal: FC<BaseModalProps> = observer(
  ({ children, statement, className, onClick }) => {
    const { switchState, open, close } = statement;

    return (
      <CurrentModalContext.Provider
        value={{
          switch: switchState,
          open,
          close,
        }}
      >
        <div className={clsx(className)} onClick={onClick}>
          {children}
        </div>
      </CurrentModalContext.Provider>
    );
  },
);
