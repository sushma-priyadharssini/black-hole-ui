import { useId, useEffect, useRef } from 'react';
import { createPortal } from "react-dom";
import styles from "./modal.module.css"
import { useAppContext } from '../../app-context';


function Backdrop({ children }) {
    return (
        <div className={styles.backdrop}>
            {children}
        </div>
    )
}

const ModalOverlay = ({ onClose, onJoinGame }) => {
    const titleId = useId();
    const contentId = useId();
    const dialogRef = useRef(null);
    const { game: { roomId }, dispatchers: { setRoomId } } = useAppContext();

    useEffect(() => {
        function onKeyDownFunction(ev) {
            if (ev.key === "Escape") {
                onClose()
            }
        }

        function onClickOutside(ev) {
            if (
                ev.target instanceof Node &&
                dialogRef.current != null &&
                !dialogRef.current?.contains(ev.target)
            ) {
                onClose()
            }
        }

        document.addEventListener("keydown", onKeyDownFunction)
        document.addEventListener('mousedown', onClickOutside);
        document.addEventListener('touchstart', onClickOutside);

        return () => {
            document.removeEventListener("keydown", onKeyDownFunction)
            document.removeEventListener('mousedown', onClickOutside);
            document.removeEventListener('touchstart', onClickOutside);
        }
    }, [onClose])

    return (
        <Backdrop onClose={onClose}>
            <div
                className={styles.modal}
                role="dialog"
                ref={dialogRef}
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby={contentId}>
                <div className={styles.modalHeader}>
                    <h3 className={styles.modalTitle} id={titleId}>{"Join a Room"}</h3>
                    <button className={styles.modalClose} onClick={onClose}>X</button>
                </div>
                <div id={contentId} className={styles.modalContent}>
                    <input
                        className={styles.modalInput}
                        placeholder="Enter Game ID"
                        value={roomId || ''}
                        onChange={(e) => setRoomId(e.target.value)}
                        required />
                </div>
                <div className={styles.modalActions}>
                    <button className={styles.modalButton} onClick={onJoinGame}>Join Game</button>
                </div>
            </div>
        </Backdrop>
    )
}

const JoinRoomModal = (props) => {
    return createPortal(<ModalOverlay {...props} />, document.getElementById('overlays'))
}

export default JoinRoomModal;