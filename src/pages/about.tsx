import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
// import { Button } from "@heroui/button";
import UsersPage from "./UsersPage";
// import display from "@/components/allowance/display";
import Allowance from "@/components/allowance/display";
import ListOfPurchases from "@/components/tables/listofpurchases";
// import ListOfSavings from "@/components/tables/listofsavings";
// import NewPurchase from "@/components/buttons/newpurchase";
import { useState } from "react";

export default function AboutPage() {

  const [refeshKey, setRefreshKey] = useState(0);

  const refreshAll = () => {
    setRefreshKey(prev => prev + 1);
  }

  // const res = await fetch("http://localhost:8080/api/purchases/1", {
  //   cache: "no-store",
  // });

  // const purchases = await res.json();

  

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        {/* <div className="flex w-full justify-center"> */}
          <div className="inline-block max-w-lg text-center justify-center">
            {/* <h1 className={title()}>Allowance</h1> */}
            <h4 className={title()}>
              <Allowance user_id={1} id={1} refreshKey={refeshKey} />
            </h4>
            
          </div>

          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div className="px-4 w-full">
              <ListOfPurchases onUpdated={refreshAll} />
              
            </div>
            <div className="px-4 w-full">
              <ListOfSavings onUpdated={refreshAll} />
            </div>
          </div> */}
          
          <div className="w-md">
            <div className="px-4 w-full">
              <ListOfPurchases onUpdated={refreshAll} />
              {/* <ListOfSavings onUpdated={refreshAll} /> */}
            </div>
            {/* <div className="px-4 w-full">
              <ListOfSavings onUpdated={refreshAll} />
            </div> */}
          </div>
        {/* </div> */}
        <div>
          <UsersPage id={1}/>
        </div>
      </section>
    </DefaultLayout>
  );
}
