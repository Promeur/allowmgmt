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
import NewPurchase from "@/components/buttons/newpurchase";

type Purchase ={
  id: number;
  userId: number;
  allowanceId: number;
  name: string;
  amount: number;
  purchaseDate: string;
}

export default function ListOfPurchases({onUpdated}:{onUpdated: () => void}){

  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const [purchases, setPurchases] = useState<Purchase[]>([]);
  
  const totalPages = Math.ceil(purchases.length / rowsPerPage);

  const paginatedPurchases = purchases.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const loadPurchases = () => {
    fetch("http://localhost:8080/api/purchases/1/1")
      .then(res => res.json())
      .then(data => setPurchases(data))
      .catch(err => console.error(err));
  }
  useEffect(() => {
        loadPurchases();
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
          
          <span className="p-4">
            {/* <Button>New Purchase</Button> */}
            <NewPurchase 
            user_id={1} 
            allowance_id={1} 
            onUpdated={() => {
              loadPurchases();
              onUpdated();
            }} />
          </span>
          <span className="p-4"><Button >Add Savings</Button></span>
          {/* <br /> */}
          
          
          
        </div>
    <Table aria-label="List of Purchases">
      <TableHeader>
        <TableColumn>Date</TableColumn>
        <TableColumn>Name</TableColumn>
        <TableColumn>Amount</TableColumn>
        {/* // <TableColumn>Date</TableColumn> */}
      </TableHeader>
      <TableBody>
        {paginatedPurchases.map((p) => (
          <TableRow key={p.id}>
            <TableCell>
              <span className="text-sm">
                {p.purchaseDate
              ? new Date(p.purchaseDate).toLocaleString()
              : "—"}
              </span>
              
            </TableCell>
            <TableCell>{p.name}</TableCell>
            <TableCell>{p.amount}</TableCell>
            {/* // <TableCell>{item.purchaseDate}</TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <div className="flex justify-center mt-4">
      <Pagination
        page={page}
        total={totalPages}
        onChange={setPage}
      />
    </div>
    </>
  );

}