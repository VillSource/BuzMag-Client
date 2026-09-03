import type { FC } from "react";
import { SearchIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";

export const SearchInput: FC = () => {
  return (
    <InputGroup className={cn("min-w-3 ms-auto me-4 w-auto max-w-sm")}>
      <InputGroupInput id="inline-start-input" placeholder="Search..." />
      <InputGroupAddon align="inline-start">
        <SearchIcon className="text-muted-foreground" />
      </InputGroupAddon>
    </InputGroup>
  );
};

export const InputGroupInlineStart = SearchInput;
