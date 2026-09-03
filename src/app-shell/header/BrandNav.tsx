import type { FC } from "react";
import { Building2Icon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InputGroupAddon } from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

export const BrandNav: FC = () => {
  const organizations = ["Acme Inc", "Starter Kit", "Enterprise"];
  const organizationPlans: Record<string, string> = {
    "Acme Inc": "Pro",
    "Starter Kit": "Free",
    Enterprise: "Enterprise",
  };

  return (
    <div className="flex items-center gap-3">
      <Combobox items={organizations} defaultValue="Acme Inc">
        <ComboboxInput
          className="h-8 w-auto border-0 bg-transparent shadow-none"
          placeholder="Organization"
          readOnly
          aria-label="Select organization"
        >
          <InputGroupAddon align="inline-start">
            <span className="flex size-5 items-center justify-center rounded-full bg-linear-to-br from-violet-500 to-fuchsia-600 text-white">
              <Building2Icon aria-hidden="true" className="size-3" />
            </span>
          </InputGroupAddon>
        </ComboboxInput>
        <ComboboxContent>
          <div className="px-3 pb-1 pt-2 text-sm font-medium text-muted-foreground">
            Organizations
          </div>
          <ComboboxEmpty className="px-3">
            No organizations found.
          </ComboboxEmpty>
          <ComboboxList className="p-2">
            {(item) => (
              <ComboboxItem key={item} value={item} className="min-h-16 py-2">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-violet-500 to-fuchsia-600 text-white">
                  <Building2Icon aria-hidden="true" />
                </span>
                <span className="flex min-w-0 flex-col gap-0.5">
                  <span className="truncate text-sm font-medium">{item}</span>
                  <span className="text-sm text-muted-foreground">
                    {organizationPlans[item]}
                  </span>
                </span>
              </ComboboxItem>
            )}
          </ComboboxList>
          <Separator />
          <Button
            type="button"
            variant="ghost"
            className="h-12 w-full justify-start rounded-none px-4"
          >
            <PlusIcon data-icon="inline-start" />
            Create Organization
          </Button>
        </ComboboxContent>
      </Combobox>
    </div>
  );
};
