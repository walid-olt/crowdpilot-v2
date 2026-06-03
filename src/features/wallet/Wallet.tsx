import { formatter } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { LucidePlus, Wallet2Icon as WalletIcon } from "lucide-react";
import { UpdateWalletForm } from "./components/UpdateWalletForm";
import { Button } from "@/components/ui/button";
import { setIsUpdatingWallet } from "./walletSlice";
export const Component = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const formattedBalance = formatter.currency(user?.balance || 0);
  const currencySymbol = formatter.currencyType();
  return (
    <section className="p-4">
      <div className="flex items-center gap-4 mb-6 justify-between">
        <div>
          <h1 className="line-clamp-1 flex w-fit items-center gap-2 leading-snug underline-offset-4 text-2xl font-bold justify-between py-1">
            <WalletIcon /> Wallet
          </h1>
          <p className="pt-2 text-4xl text-foreground font-serif">
            {formattedBalance}
          </p>
          <sub className="uppercase text-primary">
            Account balance in {currencySymbol}
          </sub>
        </div>
        <div>
          <Button
            variant={"outline"}
            size="lg"
            onClick={() => dispatch(setIsUpdatingWallet(true))}
          >
            <LucidePlus />
            Add funds
          </Button>
        </div>
      </div>
      <UpdateWalletForm />
    </section>
  );
};
