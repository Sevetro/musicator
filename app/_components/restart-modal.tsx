"use client";

export const RestartModalButton = () => (
  <button
    className="btn btn-error absolute bottom-0 right-0"
    onClick={() =>
      (document.getElementById("my_modal_1") as HTMLFormElement).showModal()
    }
  >
    Restart
  </button>
);

export const RestartModal = () => (
  <dialog id="my_modal_1" className="modal">
    <div className="modal-box">
      <h3 className="text-lg font-bold">Hello!</h3>
      <p className="py-4">Press ESC key or click the button below to close</p>
      <div className="modal-action">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn">Close</button>
        </form>
      </div>
    </div>
  </dialog>
);
