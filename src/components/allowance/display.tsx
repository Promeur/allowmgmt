import { useEffect, useState } from "react";
import { Card, CardBody } from "@heroui/card";
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

    useEffect(() => {
        fetch(`${API_BASE}/api/allowance/${user_id}/${id}`)
            .then(res => res.json())
            .then(data => setAllowance(data))
            .catch(err => console.error(err));
    }, [user_id]);

    if (!allowance) {
        return <p>Loading...</p>;
    }

    return (

        <div className="p-6">

            <h1 className="text-2xl font-bold mb-4">{allowance.name}</h1>

            {/* <div className="grid gap-4"> */}

                {/* {users.map((u) =>( */}
                    <Card key={allowance.id} className="p-4">
                        <CardBody>
                            <p className="font-medium">{allowance.allowance}</p>
                        </CardBody>
                    </Card>
                {/* ))} */}

            {/* </div> */}

        </div>

    );

}