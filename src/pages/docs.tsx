import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/button";
import UsersPage from "./UsersPage";
// import display from "@/components/allowance/display";
// import Allowance from "@/components/allowance/display";

export default function DocsPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        {/* <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Docs</h1>
          
        </div> */}
        <div className="inline-block max-w-lg text-center justify-center">
          {/* <h1 className={title()}>Allowance</h1> */}
          <h4 className={title()}>
            {/* <Allowance user_id={1} id={1} /> */}
          </h4>
        </div>
        <div className="">
          {/* <span className="p-4"><Button >Add Allowance</Button></span> */}
          <span className="p-4"><Button>New Purchase</Button></span>
          
          
        </div>
        <div>
          <UsersPage id={1}/>
        </div>
      </section>
    </DefaultLayout>
  );
}
