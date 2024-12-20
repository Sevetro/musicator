import { useEffect, useRef } from "react";

interface ModalProps {
  visible: boolean;
  onCancel: () => void;
  onClose: () => void;
}

export function TutorialModal({ visible, onCancel, onClose }: ModalProps) {
  const modalRef = useRef(null) as any;

  useEffect(() => {
    visible ? modalRef.current.showModal() : modalRef.current.close();
  }, [visible]);

  const handleClose = () => {
    onClose();
  };

  const handleESC = (event: any) => {
    event.preventDefault();
    handleClose();
  };

  return (
    <dialog ref={modalRef} className="modal" onCancel={handleESC}>
      <form method="dialog" className="modal-box">
        <h3 className="text-lg font-bold">Close tutorial</h3>
        <p className="py-4">
          Click <b>Close</b> button to switch off the tutorial. You will be able
          to switch it on again after clicking the <b>Tutorial</b> button{" "}
        </p>
        <div className="modal-action">
          <button className="btn btn-ghost" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleClose}>
            Close
          </button>
        </div>
      </form>
    </dialog>
  );
}
