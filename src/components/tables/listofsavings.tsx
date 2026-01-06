// "use client";
import 
// React, 
{ 
  // useMemo, 
  useEffect, 
  useState,
   
} from "react";
import { Button } from "@heroui/button";
// import {
//   Table,
//   TableHeader,
//   TableBody,
//   TableColumn,
//   TableRow,
//   TableCell
// } from "@heroui/table";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  // Input,
  // Dropdown,
  // DropdownTrigger,
  // DropdownMenu,
  // DropdownItem,
  // Button,
  // divider,
} from "@heroui/react";
// import NewPurchase from "@/components/buttons/newpurchase";
import AddAllowance from "../buttons/addallowance";

type Allowance ={
  id: number;
  userId: number;
  name: string;
  allowance: number;
//   purchaseDate: string;
}

export default function ListOfSavings({onUpdated}:{onUpdated: () => void}){

  const [page2, setPage2] = useState(1);
  const rowsPerPage2 = 5;

  const [allowance, setAllowance] = useState<Allowance[]>([]);
  
  const totalPages = Math.ceil(allowance.length / rowsPerPage2);

  const paginatedAllowance = allowance.slice(
    (page2 - 1) * rowsPerPage2,
    page2 * rowsPerPage2
  );

  const loadAllowance = () => {
    fetch("http://localhost:8080/api/allowance/1")
      .then(res => res.json())
      .then(data => setAllowance(data))
      .catch(err => console.error(err));
  }
  useEffect(() => {
        loadAllowance();
    }, [1, 1, onUpdated]);

  // useEffect(() => {
  //   fetch("http://localhost:8080/api/purchases/1/1")
  //     .then(res => res.json())
  //     .then(data => setPurchases(data))
  //     .catch(err => console.error(err));
  // }, []);

    // Search
  // const [search, setSearch] = useState("");

  // Filter — choose column
  // const [selectedFilter, setSelectedFilter] = useState("amount");

  // Pagination
  // const [page, setPage] = useState(1);
  // const rowsPerPage = 5;

  // Apply search + filter
  // const filteredPurchases = useMemo(() => {
  //   return purchases.filter((item) => {
  //     const value = String(item[selectedFilter]).toLowerCase();
  //     return value.includes(search.toLowerCase());
  //   });
  // }, [purchases, search, selectedFilter]);

  // // Pagination slice
  // const paginatedItems = useMemo(() => {
  //   const start = (page - 1) * rowsPerPage;
  //   return filteredPurchases.slice(start, start + rowsPerPage);
  // }, [page, filteredPurchases]);

  return (
    // <Table aria-label="List of Purchases">
    // <Table
    //   aria-label="List of Purchases"
    // >
    //   <TableHeader></TableHeader>
    // </Table>
    <>
    <div className="my-4 text-center">
          
          {/* <span className="p-4">
            
            <NewPurchase 
            user_id={1} 
            allowance_id={1} 
            onUpdated={() => {
              loadPurchases();
              onUpdated();
            }} />
          </span> */}
          <span className="p-4"><Button >Add Savings</Button></span>
          
          
          
    </div>
    <Table aria-label="List of Purchases" className="w-full" defaultSelectedKeys={["1"]}
        selectionMode="single">
      <TableHeader>
        {/* <TableColumn>Date</TableColumn> */}
        <TableColumn>Name</TableColumn>
        <TableColumn>Amount</TableColumn>
        <TableColumn>Actions</TableColumn>
      </TableHeader>
      <TableBody>
        {paginatedAllowance.map((p) => (
          <TableRow key={p.id}>
            {/* <TableCell>
              <span className="text-sm">
                {p.purchaseDate
              ? new Date(p.purchaseDate).toLocaleString()
              : "—"}
              </span>
              
            </TableCell> */}
            <TableCell>{p.name}</TableCell>
            <TableCell>{p.allowance}</TableCell>
            <TableCell>
                <Button size="sm" color="success">Select Active Savings</Button>
                <AddAllowance user_id={1} id={p.id} onUpdated={loadAllowance} />
                {/* <Button size="sm">Add Amount</Button> */}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <div className="flex justify-center mt-4">
      <Pagination
        page={page2}
        total={totalPages}
        onChange={setPage2}
      />
    </div>
    </>
  );

}