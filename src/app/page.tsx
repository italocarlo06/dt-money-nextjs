import { Header } from "@/components/Header";
import { TransactionsTable } from "@/components/TransactionsTable";
import { Summary } from "@/components/Summary";

export default function Home() {
  return (    
   <>
    <Header />
    <Summary/>
    <TransactionsTable />
   </>
  );
}
