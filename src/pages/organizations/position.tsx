import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { RefreshCcw, Trash2, Pen, Plus, Briefcase } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppShell } from "@/app-shell/AppShell";
import {
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useIsMobile } from "@/hooks/use-mobile";
import { apiClient } from "@/client";

import { createPositionMutationOptions } from "@/api/hooks/organizations/useCreatePosition";
import { updatePositionMutationOptions } from "@/api/hooks/organizations/useUpdatePosition";
import { deletePositionMutationOptions } from "@/api/hooks/organizations/useDeletePosition";
import type { PositionDto } from "@/api/types/PositionDto";
import {
  getAllDefaultPositionsQueryKey,
  getAllDefaultPositionsQueryOptions,
} from "@/api/hooks/organizations/useGetAllDefaultPositions";
import AppbarSlotContext from "@/app-shell/use-appbarSlot";

export type CreatePositionCommand = {
  code: string;
  name: string;
  description?: string | null;
  organizationId?: string | null;
};

export type UpdatePositionFormValues = {
  name: string;
  code: string;
  description: string;
};

/* =========================================================================
   SMART COMPONENTS (Containers)
   ========================================================================= */

export function PositionPage() {
  const { data, isLoading, isError, refetch } = useQuery(
    getAllDefaultPositionsQueryOptions({ client: apiClient }),
  );

  const { setPanelContent, setPanelOpen, setSheetContent, setSheetOpen } =
    useAppShell();
  const isMobile = useIsMobile();

  useEffect(() => {
    return () => {
      setPanelContent(undefined);
      setPanelOpen(false);
    };
  }, [setPanelContent, setPanelOpen]);

  const openOverlay = (content: React.ReactNode, title: string = "") => {
    if (isMobile) {
      setSheetContent({
        content,
        description: "",
        snapPoints: ["auto", "auto"],
        title,
      });
      setSheetOpen(true);
    } else {
      setPanelContent(content);
      setPanelOpen(true);
    }
  };

  const handleCreate = () => {
    openOverlay(<PositionCreateContainer key={`create-pos-${Date.now()}`} />);
  };

  const handleRowEdit = (item: PositionDto) => {
    openOverlay(
      <PositionDetailContainer
        data={item}
        isEditable={true}
        key={`edit-${item.referenceId}`}
      />,
    );
  };

  const handleRowDelete = (item: PositionDto) => {
    openOverlay(
      <PositionDeleteContainer
        data={item}
        key={`delete-${item.referenceId}`}
      />,
    );
  };

  if (isError) {
    return <div className="p-8 text-red-500">Error loading positions.</div>;
  }

  return (
    <div className="py-4">
      <div className="flex items-center justify-between mb-6 px-4">
        <h2 className="text-2xl font-bold tracking-tight">Positions</h2>
        <div className="flex gap-2">
          <AppbarSlotContext>
            <Button onClick={handleCreate}>
              <Plus className="h-4 w-4 mr-2" />
              Add Position
            </Button>
          </AppbarSlotContext>
          <Button variant="outline" onClick={() => refetch()}>
            <RefreshCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="md:px-4">
        <PositionTable
          data={data || []}
          isLoading={isLoading}
          onRowEdit={handleRowEdit}
          onRowDelete={handleRowDelete}
        />
      </div>
    </div>
  );
}

function PositionCreateContainer() {
  const { setPanelOpen, setSheetOpen } = useAppShell();
  const queryClient = useQueryClient();
  const mutation = useMutation(
    createPositionMutationOptions({ client: apiClient }),
  );

  const handleSave = (formData: CreatePositionCommand) => {
    mutation.mutate(
      {
        body: {
          ...formData,
          organizationId: null, // Set based on your specific requirements
        },
      },
      {
        onSuccess: () => {
          setPanelOpen(false);
          setSheetOpen(false);
          queryClient.invalidateQueries({
            queryKey: getAllDefaultPositionsQueryKey(),
          });
        },
      },
    );
  };

  const handleCancel = () => {
    setPanelOpen(false);
    setSheetOpen(false);
  };

  return (
    <CreatePanel
      isSaving={mutation.isPending}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
}

function PositionDetailContainer({
  data,
  isEditable,
}: {
  data: PositionDto;
  isEditable: boolean;
}) {
  const { setPanelOpen, setSheetOpen } = useAppShell();
  const queryClient = useQueryClient();
  const mutation = useMutation(
    updatePositionMutationOptions({ client: apiClient }),
  );

  const handleSave = (formData: UpdatePositionFormValues) => {
    mutation.mutate(
      { body: formData, path: { positionId: data.referenceId! } },
      {
        onSuccess: () => {
          setPanelOpen(false);
          setSheetOpen(false);
          queryClient.invalidateQueries({
            queryKey: getAllDefaultPositionsQueryKey(),
          });
        },
      },
    );
  };

  const handleCancel = () => {
    setPanelOpen(false);
    setSheetOpen(false);
  };

  return (
    <DetailPanel
      data={data}
      isEditable={isEditable}
      isSaving={mutation.isPending}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
}

function PositionDeleteContainer({ data }: { data: PositionDto }) {
  const { setPanelOpen, setSheetOpen } = useAppShell();
  const queryClient = useQueryClient();
  const mutation = useMutation(
    deletePositionMutationOptions({ client: apiClient }),
  );

  const handleConfirm = () => {
    mutation.mutate(
      { path: { positionId: data.referenceId! } },
      {
        onSuccess: () => {
          setPanelOpen(false);
          setSheetOpen(false);
          queryClient.invalidateQueries({
            queryKey: getAllDefaultPositionsQueryKey(),
          });
        },
      },
    );
  };

  const handleCancel = () => {
    setPanelOpen(false);
    setSheetOpen(false);
  };

  return (
    <DeleteConfirmationPanel
      data={data}
      isDeleting={mutation.isPending}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  );
}

/* =========================================================================
   DUMB COMPONENTS (Presentational)
   ========================================================================= */

function PositionTable({
  data,
  isLoading,
  onRowEdit,
  onRowDelete,
}: {
  data: PositionDto[];
  isLoading: boolean;
  onRowEdit: (item: PositionDto) => void;
  onRowDelete: (item: PositionDto) => void;
}) {
  return (
    <div className="w-full md:rounded-md border bg-card md:shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[400px]">Name</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Reference Id</TableHead>
            <TableHead className="w-[120px] text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={5}>
                <Skeleton className="h-24 w-full" />
              </TableCell>
            </TableRow>
          ) : !data || data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="h-24 text-center text-muted-foreground"
              >
                No positions found.
              </TableCell>
            </TableRow>
          ) : (
            data.map((item) => (
              <TableRow
                key={item.referenceId || item.code}
                className="hover:bg-muted/40"
              >
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-primary shrink-0" />
                    <span
                      onClick={() => onRowEdit(item)}
                      className="font-medium whitespace-nowrap cursor-pointer hover:underline"
                    >
                      {item.name || "-"}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-xs">
                  {item.code || "-"}
                </TableCell>
                <TableCell
                  className="max-w-[250px] truncate text-muted-foreground"
                  title={item.description || ""}
                >
                  {item.description || "-"}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {item.referenceId || "-"}
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-blue-600 hover:text-blue-900 hover:bg-blue-600/10"
                    onClick={() => onRowEdit(item)}
                    title="Edit Position"
                  >
                    <Pen className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => onRowDelete(item)}
                    title="Delete Position"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function CreatePanel({
  isSaving = false,
  onSave,
  onCancel,
}: {
  isSaving?: boolean;
  onSave: (data: CreatePositionCommand) => void;
  onCancel: () => void;
}) {
  const { register, handleSubmit } = useForm<CreatePositionCommand>({
    defaultValues: {
      name: "",
      code: "",
      description: "",
      organizationId: null,
    },
  });

  return (
    <>
      <SidebarHeader className="font-semibold text-lg border-b pb-4">
        Create Position
      </SidebarHeader>

      <SidebarContent className="p-4 overflow-y-auto">
        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              placeholder="e.g. Senior Software Engineer"
              disabled={isSaving}
              required
              {...register("name")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="code">
              Code <span className="text-destructive">*</span>
            </Label>
            <Input
              id="code"
              placeholder="e.g. POS-SSE"
              disabled={isSaving}
              required
              {...register("code")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Add details about this position..."
              className="resize-none h-24"
              disabled={isSaving}
              {...register("description")}
            />
          </div>
        </div>
      </SidebarContent>

      <SidebarFooter className="border-t pt-4 mt-auto">
        <div className="flex w-full gap-2">
          <Button
            onClick={handleSubmit(onSave)}
            className="flex-1"
            disabled={isSaving}
          >
            {isSaving ? "Creating..." : "Create"}
          </Button>
          <Button
            variant="secondary"
            className="flex-1"
            onClick={onCancel}
            disabled={isSaving}
          >
            Cancel
          </Button>
        </div>
      </SidebarFooter>
    </>
  );
}

function DeleteConfirmationPanel({
  data,
  isDeleting,
  onConfirm,
  onCancel,
}: {
  data: PositionDto;
  isDeleting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <>
      <SidebarHeader className="font-semibold text-lg border-b pb-4 text-destructive">
        Confirm Deletion
      </SidebarHeader>

      <SidebarContent className="p-4 overflow-y-auto">
        <div className="flex flex-col gap-4">
          <p className="text-sm">
            Are you sure you want to delete the following position? This action
            cannot be undone.
          </p>
          <div className="bg-muted p-4 rounded-md space-y-2 mt-2 border">
            <div className="grid grid-cols-3 gap-1 text-sm">
              <span className="font-medium text-muted-foreground">Name:</span>
              <span className="col-span-2 font-medium">{data.name}</span>
            </div>
            <div className="grid grid-cols-3 gap-1 text-sm">
              <span className="font-medium text-muted-foreground">Code:</span>
              <span className="col-span-2">{data.code || "-"}</span>
            </div>
          </div>
        </div>
      </SidebarContent>

      <SidebarFooter className="border-t pt-4 mt-auto">
        <div className="flex w-full gap-2">
          <Button
            variant="destructive"
            onClick={onConfirm}
            className="flex-1"
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
          <Button
            variant="secondary"
            className="flex-1"
            onClick={onCancel}
            disabled={isDeleting}
          >
            Cancel
          </Button>
        </div>
      </SidebarFooter>
    </>
  );
}

function DetailPanel({
  data,
  isEditable,
  isSaving = false,
  onSave,
  onCancel,
}: {
  data: PositionDto;
  isEditable: boolean;
  isSaving?: boolean;
  onSave: (data: UpdatePositionFormValues) => void;
  onCancel: () => void;
}) {
  const { register, handleSubmit } = useForm<UpdatePositionFormValues>({
    defaultValues: {
      name: data.name || "",
      code: data.code || "",
      description: data.description || "",
    },
  });

  return (
    <>
      <SidebarHeader className="font-semibold text-lg border-b pb-4">
        Position {isEditable ? "Edit" : "Detail"}
      </SidebarHeader>

      <SidebarContent className="p-4 overflow-y-auto">
        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            {isEditable ? (
              <Input
                id="name"
                placeholder="e.g. Senior Software Engineer"
                disabled={isSaving}
                {...register("name")}
              />
            ) : (
              <div className="text-sm py-1.5 font-medium">
                {data.name || "-"}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="code">Code</Label>
            {isEditable ? (
              <Input
                id="code"
                placeholder="e.g. POS-SSE"
                disabled={isSaving}
                {...register("code")}
              />
            ) : (
              <div className="text-sm py-1.5">{data.code || "-"}</div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            {isEditable ? (
              <Textarea
                id="description"
                placeholder="Add details..."
                className="resize-none h-24"
                disabled={isSaving}
                {...register("description")}
              />
            ) : (
              <div className="text-sm py-1.5 whitespace-pre-wrap text-muted-foreground">
                {data.description || "-"}
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t space-y-1 text-xs text-muted-foreground">
            <p className="font-medium text-foreground mb-2">
              System Information
            </p>
            <div className="grid grid-cols-3 gap-1">
              <span className="font-medium">Ref ID:</span>
              <span className="col-span-2 truncate" title={data.referenceId}>
                {data.referenceId || "-"}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1">
              <span className="font-medium">Created:</span>
              <span className="col-span-2">
                {data.createdOnUtc
                  ? new Date(data.createdOnUtc).toLocaleString()
                  : "-"}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1">
              <span className="font-medium">Modified:</span>
              <span className="col-span-2">
                {data.lastModifiedOnUtc
                  ? new Date(data.lastModifiedOnUtc).toLocaleString()
                  : "-"}
              </span>
            </div>
          </div>
        </div>
      </SidebarContent>

      <SidebarFooter className="border-t pt-4 mt-auto">
        <div className="flex w-full gap-2">
          {isEditable ? (
            <>
              <Button
                onClick={handleSubmit(onSave)}
                className="flex-1"
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save"}
              </Button>
              <Button
                variant="secondary"
                className="flex-1"
                onClick={onCancel}
                disabled={isSaving}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button variant="secondary" className="flex-1" onClick={onCancel}>
              Close
            </Button>
          )}
        </div>
      </SidebarFooter>
    </>
  );
}
