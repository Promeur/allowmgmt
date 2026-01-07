import { 
    useState, 
    // useEffect 
} from "react";
// import { Button } from "@heroui/button";
// import { Input } from "@heroui/input";
// import { useDisclosure } from "@heroui/hooks";
import { Button, Input, useDisclosure, Spinner } from "@heroui/react";
import { 
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
//   ModalFooter 
} from "@heroui/react";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function AddSavings(
    { user_id, onUpdated }:{ user_id:number, onUpdated: () => void }
){

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [name, setName] = useState<string>("");
    const [allowance, setAllowance] = useState<number | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const addAllowanceAmount = () => {

        // if(!amount) return;
        if (allowance === null || isNaN(allowance)) return;

        setIsSaving(true);

        fetch(`${API_BASE}/api/allowance/${user_id}/new?name=${name}&allowance=${allowance}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(() => {
                setAllowance(null);
                setIsSaving(false);
                onClose();
                onUpdated();
            })
            .catch(err => {
                console.error(err);
                setIsSaving(false);
            });

    }

    return (

        <>
            <Button size="sm" onPress={onOpen}>Add Savings</Button>

            {isSaving && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999]">
                    <Spinner color="white" size="lg" />
                </div>
            )}

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    {/* {(onClose) => ( */}
                        <>
                            <ModalHeader>New Savings</ModalHeader>
                            <ModalBody>
                                <Input
                                    type="string"
                                    label="Enter Name"
                                    value={name}
                                    onChange={
                                        (e) => setName(e.target.value)
                                    }
                                />
                                <Input 
                                    type="number"
                                    label="Enter Amount"
                                    value={allowance !== null ? allowance.toString() : ''}
                                    onChange={
                                        (e) => setAllowance(Number(e.target.value))
                                    }

                                />
                                <Button
                                onPress={addAllowanceAmount}>
                                    Save
                                </Button>
                            </ModalBody>
                        </>
                    {/* )} */}
                </ModalContent>
            </Modal>
        </>

    );

}