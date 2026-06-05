import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { useAppSelector } from "@/store/hooks";
import {
  createInvestmentSchema,
  getMaximumAllowedInvestment,
} from "../schemas";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { ArrowUp, Loader2Icon } from "lucide-react";
import { useEffect } from "react";
import { useSubmitInvestmentMutation } from "../hooks";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const InvestmentForm = () => {
  const project = useAppSelector((s) => s.investments.currentProject)!;
  const schema = createInvestmentSchema(project);
  const { mutate, isPending } = useSubmitInvestmentMutation(project._id);
  const navigate = useNavigate();
  const {
    register,
    reset,
    setFocus,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "all",

    resolver: zodResolver(schema),
  });

  useEffect(() => setFocus("amount"), [setFocus]);

  const onSubmit = (payload: z.infer<typeof schema>) => {
    mutate(payload, {
      onSuccess: (res) => {
        toast.success(res.message || "Investment submitted successfully ");
        reset();
        navigate(-1);
        return;
      },
      onError: (error) => {
        toast.error(error.message);
        setError("amount", { message: error.message });
        reset();
      },
    });
  };
  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="text-xs uppercase tracking-widest text-muted-foreground flex justify-between py-2 items-center">
          <label htmlFor="amount">Amount</label>
          <sub>max:{getMaximumAllowedInvestment(project)}</sub>
        </div>
        <div className="flex gap-x-4">
          <div className="grow">
            <InputGroup className="py-2">
              <InputGroupInput
                placeholder="amount"
                type="number"
                {...register("amount")}
                aria-invalid={!!errors.amount}
              />
              <InputGroupAddon align={"inline-end"}>
                <InputGroupText>MAD</InputGroupText>
              </InputGroupAddon>
            </InputGroup>

            {errors.amount && (
              <label className="text-destructive">
                {errors.amount.message}{" "}
              </label>
            )}
          </div>

          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              <>
                submit
                <ArrowUp />
              </>
            )}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default InvestmentForm;
