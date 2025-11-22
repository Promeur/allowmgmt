import { useEffect, useState } from "react";
import { Card, CardBody } from "@heroui/card";
// import { div } from "framer-motion/client";

type User = {
  id: number;
  username: string;
  password?: string;
};

export default function UsersPage({ id }: { id: number} ){

    // const [users, setUsers] = useState([]);
    const [users, setUsers] = useState<User | null>(null);

    useEffect(() => {
        fetch(`http://localhost:8080/api/users/${id}`)
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => console.error(err));
    }, [id]);

    if (!users) {
        return <p>Loading...</p>;
    }

    return (

        <div className="p-6">

            <h1 className="text-2xl font-bold mb-4">Users</h1>

            <div className="grid gap-4">

                {/* {users.map((u) =>( */}
                    <Card key={users.id} className="p-4">
                        <CardBody>
                            <p className="font-medium">Username: {users.username}</p>
                        </CardBody>
                    </Card>
                {/* ))} */}

            </div>

        </div>

    );

}