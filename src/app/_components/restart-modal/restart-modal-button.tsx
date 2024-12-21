export const RestartModalButton = () => (
  <button
    className="btn btn-error absolute bottom-0 right-0"
    onClick={() =>
      (document.getElementById(modalId) as HTMLFormElement).showModal()
    }
  >
    Restart
  </button>
);
