import { useEffect, useState } from "react";
import { Card, CardBody } from "@heroui/card";
import AddAllowance from "../buttons/addallowance";
// import { div } from "framer-motion/client";

type Allowance = {
  id: number;
  user_id: number;
  name: string;
  allowance: number;
};

const API_BASE = import.meta.env.VITE_API_BASE;

export default function Allowance({ user_id, id }: { user_id: number, id: number} ){

    // const [users, setUsers] = useState([]);
    const [allowance, setAllowance] = useState<Allowance | null>(null);

    // const loadAllowance = () => {
    //     fetch(`http://localhost:8080/api/allowance/${user_id}/${id}`)
    const loadAllowance = () => {
        fetch(`${API_BASE}/api/allowance/${user_id}/${id}`)
            .then(res => res.json())
            .then(data => setAllowance(data))
            .catch(err => console.error(err));
    }

    useEffect(() => {
        loadAllowance();
    }, [user_id, id]);

    if (!allowance) {
        return <p>Loading...</p>;
    }

    return (

        <div className="p-6">

            <h1 className="text-2xl font-bold mb-4">{allowance.name}</h1>

            {/* <div className="grid gap-4"> */}

                {/* {users.map((u) =>( */}
                    <div className="flex gap-4">
                        <Card className="p-4 flex-1">
                            <CardBody>
                                <p className="font-medium">{allowance.allowance}</p>
                            </CardBody>
                        </Card>
                        <AddAllowance user_id={user_id} id={id} onUpdated={loadAllowance} />
                    </div>
                {/* ))} */}

            {/* </div> */}

        </div>

    );

}