// import { 
//     useState, 
//     // useEffect 
// } from "react";
// import { Button } from "@heroui/button";
// import { Input } from "@heroui/input";
// import { useDisclosure } from "@heroui/hooks";
import { 
    Button, 
    // Input, 
    useDisclosure,
    // Spinner 
} from "@heroui/react";
import { 
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
//   ModalFooter 
} from "@heroui/react";
import ListOfSavings from "../tables/listofsavings";
// import AddAllowance from "./addallowance";



export default function ShowSavingsList(
    { onUpdated }:{ onUpdated: () => void }
){

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (

        <>

        <Button size="sm" onClick={onOpen}>Select Savings</Button>

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                <ModalHeader> List of Savings </ModalHeader>
                <ModalBody>
                    <ListOfSavings onUpdated={onUpdated} />
                </ModalBody>
            </ModalContent>
        </Modal>

        </>

    );
    
}