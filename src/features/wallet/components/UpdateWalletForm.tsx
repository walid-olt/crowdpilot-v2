import {
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialog,
} from "@/components/ui/alert-dialog";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupText,
} from "@/components/ui/input-group";
import { useMutation } from "@tanstack/react-query";
import { LucideLoader2, CreditCardIcon } from "lucide-react";
import { useState } from "react";
import z from "zod";
import { updateUserWallet } from "../api";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUser } from "@/features/auth/authSlice";
import { setIsUpdatingWallet } from "../walletSlice";
import toast from "react-hot-toast";

const walletSchema = z.object({
  amount: z.number().min(1, "Amount must be greater than 0"),
  operation: z.enum(["add", "deduct"]).default("add"),
});
export function UpdateWalletForm() {
  const isUpdatingWallet = useAppSelector((s) => s.wallet.isUpdatingWallet);
  const user = useAppSelector((s) => s.auth.user);
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState("");
  const onCancel = () => {
    setAmount(0);
    setError("");
    dispatch(setIsUpdatingWallet(false));
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
    const { error } = walletSchema.safeParse({
      amount: Number(e.target.value),
    });
    if (error) return setError(error.errors[0].message);
    setError("");
  };
  const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, error } = walletSchema.safeParse({ amount });
    if (error) {
      setError(error.errors[0].message);
      return;
    }
    mutate(data);
  };
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof walletSchema>) =>
      updateUserWallet(user!.id, data),
    onSuccess: (data) => {
      const updatedUser = data.data;
      if (!updatedUser)
        return setError("Failed to update wallet. Please try again.");
      toast.success("Wallet updated successfully!");
      dispatch(setUser(updatedUser));
      dispatch(setIsUpdatingWallet(false));
    },
    onError: (e) => {
      setError(e.message || "Failed to update wallet. Please try again.");
    },
  });
  return (
    <AlertDialog open={isUpdatingWallet}>
      <AlertDialogContent>
        <AlertDialogHeader className="px-2 ">
          <div className="flex items-start gap-4">
            <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <CreditCardIcon className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-1">
              <AlertDialogTitle className="text-base font-medium leading-snug">
                Update Wallet
              </AlertDialogTitle>
              <AlertDialogDescription className="text-sm text-muted-foreground leading-relaxed">
                Add funds to your wallet to support your projects and make
                transactions seamlessly.
              </AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <label
              htmlFor="amount"
              className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground"
            >
              Amount to Add
            </label>
            <InputGroup>
              <InputGroupInput
                onChange={onChange}
                id="amount"
                name="amount"
                placeholder="2000"
                autoComplete="off"
                type="number"
                aria-invalid={Boolean(error)}
                disabled={isPending}
                className={"disabled:cursor-not-allowed disabled:grayscale"}
              />
              <InputGroupAddon align="inline-end">
                <InputGroupText>MAD</InputGroupText>
              </InputGroupAddon>
            </InputGroup>

            {error && <label className="text-destructive">{error}</label>}
          </div>

          <AlertDialogFooter>
            <AlertDialogAction
              className="flex items-center justify-center relative min-w-20"
              disabled={isPending}
              type="submit"
            >
              {isPending ? <LucideLoader2 className="animate-spin  " /> : "add"}
            </AlertDialogAction>
            <AlertDialogCancel
              disabled={isPending}
              onClick={onCancel}
              type="button"
            >
              cancel
            </AlertDialogCancel>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
