import { useDispatch, useSelector } from "react-redux"
import { onCloseDateModal, onOpenDateModal } from "../store";

export const UseUiStore = () => {
    const { isDateModalOpen } = useSelector(state => state.ui);
    const dispatch = useDispatch();
    const openDateModal = () => {
        dispatch(onOpenDateModal())
    }
    const closeDateModal = () => {
        dispatch(onCloseDateModal())
    }
    const toggleDateModal = () => {
        isDateModalOpen
            ? closeDateModal()
            : openDateModal()

    }


    return {
        openDateModal,
        toggleDateModal,
        closeDateModal,
        isDateModalOpen
    }
}


