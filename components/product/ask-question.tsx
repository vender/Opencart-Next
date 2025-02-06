import Button from "#/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "#/components/ui/dialog"
import ContactForm from "#/components/form/contact-form";
import { useState } from "react";

export function AskQuestion({productName}:{productName: string}) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button title="Задать вопрос">Задать вопрос</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[500px] bg-white">

                <DialogHeader>
                    <DialogTitle>Задать вопрос о товаре</DialogTitle>
                    <DialogDescription>
                        {productName}
                    </DialogDescription>
                </DialogHeader>

                <ContactForm productName={productName} />

            </DialogContent>

        </Dialog>
    )
}
