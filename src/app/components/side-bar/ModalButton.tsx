import { useState } from "react";
import { Button } from "../Button";
import { Modal } from "../Modal";

export function ModalButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="p-4 bg-linear-to-r from-[#bd77ff] to-[rgba(215,173,255,0.8)] rounded-xl flex justify-center">
        <Button
          onClick={() => setIsOpen(true)}
          variant="primary"
          title="Открыть модалку"
        />
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="grid gap-2">
          <p className="text-xl">Модальное окно</p>
          <p className="text-center">Можно закрыть нажав на фон либо на одну из кнопок</p>
          <Button
            title="Закрыть"
            onClick={() => setIsOpen(false)}
            variant="primary"
          />
        </div>
      </Modal>
    </>
  );
}
