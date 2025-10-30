import cn from 'classnames';
import { useEffect, useRef } from 'react';

type Props = {
  errorMessage: string | null;
  onDeleteErrorMessage: () => void;
};

export const ErrorMessage = ({ errorMessage, onDeleteErrorMessage }: Props) => {
  const timerId = useRef<number | null>(null);

  useEffect(() => {
    if (timerId.current !== null) {
      clearTimeout(timerId.current);
    }

    if (errorMessage !== null) {
      timerId.current = window.setTimeout(() => {
        onDeleteErrorMessage();
      }, 3000);
    }

    return () => {
      if (timerId.current !== null) {
        clearTimeout(timerId.current);
      }
    };
  }, [errorMessage, onDeleteErrorMessage]);

  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: errorMessage === null,
      })}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => onDeleteErrorMessage()}
      />
      {/* show only one message at a time */}
      {errorMessage}
    </div>
  );
};

// Unable to load todos
// <br />
// Title should not be empty
// <br />
// Unable to add a todo
// <br />
// Unable to delete a todo
// <br />
// Unable to update a todo
