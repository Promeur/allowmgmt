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
// import { on } from "events";

export default function AddAllowance(
    { user_id, id, onUpdated }:{ user_id:number, id: number, onUpdated: () => void }
){

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [amount, setAmount] = useState<number | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const addAmount = () => {

        // if(!amount) return;
        if (amount === null || isNaN(amount)) return;

        setIsSaving(true);

        fetch(`http://localhost:8080/api/allowance/${user_id}/${id}/add?amountToAdd=${amount}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(() => {
                setAmount(null);
                setIsSaving(false);
                onClose();
                onUpdated();
            })
            .catch(err => {
                console.error(err);
                setIsSaving(false);
            });

    }
    // useEffect(() => {

    //     fetch(`http://localhost:8080/api/allowance/${user_id}/${id}/add?amountToAdd=${amount}`, {
    //         method: 'PUT',
    //     })
    //         .then(res => res.json())
    //         .then(updated => setAmount(updated.amount))
    //         // .catch(err => console.error(err));

    // }, [user_id, id, amount]);

    return (

        <>
            <Button onPress={onOpen}>Add</Button>

            {isSaving && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999]">
                    <Spinner color="white" size="lg" />
                </div>
            )}

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    {/* {(onClose) => ( */}
                        <>
                            <ModalHeader>Add Allowance</ModalHeader>
                            <ModalBody>
                                <Input 
                                    type="number"
                                    label="Enter Amount"
                                    value={amount !== null ? amount.toString() : ''}
                                    onChange={
                                        (e) => setAmount(Number(e.target.value))
                                    }

                                />
                                <Button
                                onPress={addAmount}>
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

