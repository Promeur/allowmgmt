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

export default function NewPurchase(
    { 
        user_id, 
        allowance_id, 
        // id, 
        onUpdated 
    }:{ 
        user_id:number, 
        allowance_id:number, 
        // id:number, 
        onUpdated: () => void }
){

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [name, setName] = useState<string>("");
    const [amount, setAmount] = useState<number | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const newPurchase = () => {

        if (amount === null || isNaN(amount)) return;

        setIsSaving(true);

        fetch(`${API_BASE}/api/purchases/${user_id}/${allowance_id}/new?name=${name}&amount=${amount}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(() => {
                setName("");
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

    return (

        <>

            <Button onPress={onOpen}>New Purchase</Button>

            { isSaving && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999]">
                    <Spinner color="white" size="lg" />
                </div>
            )}

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    <ModalHeader>New Purchase</ModalHeader>
                    <ModalBody>
                        <Input
                            type="text"
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input
                            label="Amount"
                            type="number"
                            value={amount !== null ? amount.toString() : ""}
                            onChange={(e) => setAmount(parseFloat(e.target.value))}
                        />
                        <Button
                        onPress={newPurchase}>
                            Add Purchase
                        </Button>
                    </ModalBody>
                </ModalContent>
            </Modal>

        </>

    );

}