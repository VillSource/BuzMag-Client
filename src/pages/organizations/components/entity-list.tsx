import { useEffect, useState, type ReactNode } from "react";
import {
  CheckIcon,
  PlusIcon,
  RefreshCwIcon,
  TriangleAlertIcon,
  Trash2Icon,
  XIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export type Column<T> = {
  key: string;
  header: string;
  className?: string;
  render: (row: T) => ReactNode;
};

type EntityListProps<T> = {
  title: string;
  description?: string;
  icon?: ReactNode;
  columns: Column<T>[];
  data?: T[];
  rowKey?: (row: T) => string;
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string | null;
  onRefetch: () => void;
  onAdd: () => void;
  onEdit: (row: T) => void;
  onDelete: (row: T) => void;
};

/** Trash button with a two-step inline confirmation. */
function DeleteButton({
  disabled,
  onConfirm,
}: {
  disabled?: boolean;
  onConfirm: () => void;
}) {
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (!armed) return;
    const timer = window.setTimeout(() => setArmed(false), 3000);
    return () => window.clearTimeout(timer);
  }, [armed]);

  if (armed) {
    return (
      <div className="flex items-center gap-1">
        <Button
          type="button"
          size="icon-xs"
          variant="destructive"
          onClick={() => {
            setArmed(false);
            onConfirm();
          }}
          aria-label="Confirm delete"
        >
          <CheckIcon aria-hidden="true" />
        </Button>
        <Button
          type="button"
          size="icon-xs"
          variant="ghost"
          onClick={() => setArmed(false)}
          aria-label="Cancel delete"
        >
          <XIcon aria-hidden="true" />
        </Button>
      </div>
    );
  }

  return (
    <Button
      type="button"
      size="icon-xs"
      variant="ghost"
      disabled={disabled}
      onClick={() => setArmed(true)}
      aria-label="Delete"
      className="text-destructive hover:text-destructive"
    >
      <Trash2Icon aria-hidden="true" />
    </Button>
  );
}

export function EntityList<T>({
  title,
  description,
  icon,
  columns,
  data,
  rowKey,
  isLoading,
  isError,
  errorMessage,
  onRefetch,
  onAdd,
  onEdit,
  onDelete,
}: EntityListProps<T>) {
  const keyOf = (row: T): string =>
    rowKey
      ? rowKey(row)
      : row && typeof row === "object"
        ? (String((row as Record<string, unknown>).referenceId ?? "") || JSON.stringify(row))
        : String(row);

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          {icon && <span className="text-muted-foreground">{icon}</span>}
          <div>
            <h1 className="font-heading text-xl font-semibold tracking-tight">{title}</h1>
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
        </div>
        <Button onClick={onAdd}>
          <PlusIcon aria-hidden="true" />
          Add {title}
        </Button>
      </div>

      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col.key} className={col.className}>
                  {col.header}
                </TableHead>
              ))}
              <TableHead className="w-16 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          {isLoading ? (
            <TableBody>
              {Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  {columns.map((col) => (
                    <TableCell key={col.key}>
                      <Skeleton className={cn("h-4", i === 0 ? "w-2/3" : "w-1/2")} />
                    </TableCell>
                  ))}
                  <TableCell />
                </TableRow>
              ))}
            </TableBody>
          ) : isError ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="h-40">
                  <div className="flex flex-col items-center justify-center gap-3 text-center">
                    <TriangleAlertIcon aria-hidden="true" className="size-6 text-destructive" />
                    <p className="text-sm font-medium">
                      {errorMessage ?? "Failed to load data."}
                    </p>
                    <Button variant="outline" size="sm" onClick={onRefetch}>
                      <RefreshCwIcon aria-hidden="true" />
                      Retry
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          ) : !data || data.length === 0 ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="h-40">
                  <div className="flex flex-col items-center justify-center gap-3 text-center">
                    <p className="text-sm text-muted-foreground">No {title.toLowerCase()} found.</p>
                    <Button variant="outline" size="sm" onClick={onAdd}>
                      <PlusIcon aria-hidden="true" />
                      Add {title}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={keyOf(row)}
                  className="cursor-pointer"
                  onClick={() => onEdit(row)}
                >
                  {columns.map((col) => (
                    <TableCell key={col.key} className={col.className}>
                      {col.render(row)}
                    </TableCell>
                  ))}
                  <TableCell className="w-16 text-right" onClick={(e) => e.stopPropagation()}>
                    <DeleteButton onConfirm={() => onDelete(row)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </Card>
    </div>
  );
}
