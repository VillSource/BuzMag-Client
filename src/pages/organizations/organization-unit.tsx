import {
  getAllDefaultOrganizationUnitQueryKey,
  getAllDefaultOrganizationUnitQueryOptions,
} from "@/api/hooks/organizations/useGetAllDefaultOrganizationUnit";
import type { OrganizationUnitDto } from "@/api/types/OrganizationUnitDto";
import { updateOrganizationUnitMutationOptions } from "@/api/hooks/organizations/useUpdateOrganizationUnit";
import { deleteOrganizationUnitMutationOptions } from "@/api/hooks/organizations/useDeleteOrganizationUnit"; 
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  ChevronRight,
  ChevronDown,
  Folder,
  File,
  Building2,
  RefreshCcw,
  Trash2,
  Pen, 
} from "lucide-react";
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

export type FormValues = {
  name: string;
  code: string;
  description: string;
};

/* =========================================================================
   SMART COMPONENTS (Containers)
   ========================================================================= */

// 1. Main Page Container
export function OrganizationUnitPage() {
  const { data, isLoading, isError, refetch } = useQuery(
    getAllDefaultOrganizationUnitQueryOptions(),
  );

  const { setPanelContent, setPanelOpen, setSheetContent, setSheetOpen } = useAppShell();
  const isMobile = useIsMobile();

  useEffect(() => {
    return () => {
      setPanelContent(undefined);
      setPanelOpen(false);
    };
  }, [setPanelContent, setPanelOpen]);

  // Handle Edit/Detail
  const handleRowEdit = (item: OrganizationUnitDto) => {
    const detailContent = <OrganizationDetailContainer data={item} isEditable={true} key={item.referenceId}/>;
    if (isMobile) {
      setSheetContent({
        content: detailContent,
        description: "",
        snapPoints: ["auto", "auto"],
        title: "",
      });
      setSheetOpen(true);
    } else {
      setPanelContent(detailContent);
      setPanelOpen(true);
    }
  };

  // Handle Delete
  const handleRowDelete = (item: OrganizationUnitDto) => {
    const deleteContent = <OrganizationDeleteContainer data={item} key={item.referenceId}/>;
    if (isMobile) {
      setSheetContent({
        content: deleteContent,
        description: "",
        snapPoints: ["auto", "auto"],
        title: "",
      });
      setSheetOpen(true);
    } else {
      setPanelContent(deleteContent);
      setPanelOpen(true);
    }
  };

  if (isError) {
    return <div className="p-8 text-red-500">Error loading data.</div>;
  }

  return (
    <div className="py-4">
      <div className="flex items-center justify-between mb-6 px-4 ">
        <h2 className="text-2xl font-bold tracking-tight">Organization Units</h2>
        <Button onClick={() => refetch()}>
          <RefreshCcw className="h-4 w-4" />
        </Button>
      </div>

      <div className="md:px-4">
        <OrganizationTable
          data={data || []}
          isLoading={isLoading}
          onRowEdit={handleRowEdit}
          onRowDelete={handleRowDelete}
        />
      </div>
    </div>
  );
}

// 2. Detail Panel Container
function OrganizationDetailContainer({ data, isEditable }: { data: OrganizationUnitDto; isEditable: boolean }) {
  const { setPanelOpen, setSheetOpen } = useAppShell();
  const queryClient = useQueryClient();
  const mutation = useMutation(updateOrganizationUnitMutationOptions());

  const handleSave = (formData: FormValues) => {
    mutation.mutate(
      {
        body: formData,
        path: { organizationUnitId: data.referenceId! },
      },
      {
        onSuccess: () => {
          setPanelOpen(false);
          setSheetOpen(false);
          queryClient.invalidateQueries({
            queryKey: getAllDefaultOrganizationUnitQueryKey(),
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

// 3. Delete Container (Smart)
function OrganizationDeleteContainer({ data }: { data: OrganizationUnitDto }) {
  const { setPanelOpen, setSheetOpen } = useAppShell();
  const queryClient = useQueryClient();
  const mutation = useMutation(deleteOrganizationUnitMutationOptions());

  const handleConfirm = () => {
    mutation.mutate(
      {
        path: { organizationUnitId: data.referenceId! },
      },
      {
        onSuccess: () => {
          setPanelOpen(false);
          setSheetOpen(false);
          queryClient.invalidateQueries({
            queryKey: getAllDefaultOrganizationUnitQueryKey(),
          });
        },
      }
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

// 4. The Table Wrapper
function OrganizationTable({
  data,
  isLoading,
  onRowEdit,
  onRowDelete,
}: {
  data: OrganizationUnitDto[];
  isLoading: boolean;
  onRowEdit: (item: OrganizationUnitDto) => void;
  onRowDelete: (item: OrganizationUnitDto) => void;
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
            <TableHead className="w-[80px] text-center">Action</TableHead> {/* เพิ่มหัวคอลัมน์ */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <>
              {Array.from({ length: 10 }).map((_, row) => (
                <TableRow key={row}>
                  {Array.from({ length: 5 }).map((_, col) => (
                    <TableCell key={col}>
                      <Skeleton className="h-3 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </>
          ) : !data || data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                No organization units found.
              </TableCell>
            </TableRow>
          ) : (
            data.map((item) => (
              <OrgUnitTableRow
                key={item.referenceId || item.code || item.name}
                item={item}
                onRowEditing={onRowEdit}
                onRowDelete={onRowDelete}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

// 5. The Recursive Table Row
function OrgUnitTableRow({
  item,
  depth = 0,
  onRowEditing,
  onRowDelete,
}: {
  item: OrganizationUnitDto;
  depth?: number;
  onRowEditing: (item: OrganizationUnitDto) => void;
  onRowDelete: (item: OrganizationUnitDto) => void;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <Fragment>
      <TableRow className={depth === 0 ? "bg-muted/20 hover:bg-muted/40" : ""}>
        <TableCell>
          <div className="flex items-center gap-2" style={{ paddingLeft: `${depth * 1.5}rem` }}>
            {hasChildren ? (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 shrink-0 p-0 hover:bg-muted"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </Button>
            ) : (
              <div className="h-6 w-6 shrink-0" />
            )}

            {depth === 0 ? (
              <Building2 className="h-4 w-4 text-primary shrink-0" />
            ) : hasChildren ? (
              <Folder className="h-4 w-4 text-blue-500 shrink-0" />
            ) : (
              <File className="h-4 w-4 text-muted-foreground shrink-0" />
            )}

            <span
              onClick={() => onRowEditing(item)}
              className="font-medium whitespace-nowrap cursor-pointer hover:underline"
            >
              {item.name || "-"}
            </span>
          </div>
        </TableCell>

        <TableCell className="font-mono text-xs">{item.code || "-"}</TableCell>

        <TableCell className="max-w-[250px] truncate text-muted-foreground" title={item.description || ""}>
          {item.description || "-"}
        </TableCell>

        <TableCell className="whitespace-nowrap">
          {item.referenceId ? item.referenceId : "-"}
        </TableCell>

        {/* คอลัมน์ Action สำหรับปุ่ม Delete */}
        <TableCell className="text-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => { onRowDelete(item)}}
            title="Delete Organization Unit"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-blue-600 hover:text-blue-900 hover:bg-blue-600/10"
            onClick={() => { onRowEditing(item)}}
            title="Edit Organization Unit"
          >
            <Pen className="h-4 w-4" />
          </Button>
        </TableCell>
      </TableRow>

      {isOpen &&
        hasChildren &&
        item.children!.map((child) => (
          <OrgUnitTableRow
            key={child.referenceId || child.code || child.name}
            item={child}
            depth={depth + 1}
            onRowEditing={onRowEditing}
            onRowDelete={onRowDelete}
          />
        ))}
    </Fragment>
  );
}

// 6. Delete Confirmation Panel View (Dumb)
function DeleteConfirmationPanel({
  data,
  isDeleting,
  onConfirm,
  onCancel,
}: {
  data: OrganizationUnitDto;
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
            Are you sure you want to delete the following organization unit? This action cannot be undone.
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
          
          {data.children && data.children.length > 0 && (
            <p className="text-sm text-destructive font-medium mt-2">
              Warning: This unit contains {data.children.length} child unit(s). Deleting it might affect them.
            </p>
          )}
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

// 7. Detail Panel View (Dumb)
function DetailPanel({
  data,
  isEditable,
  isSaving = false,
  onSave,
  onCancel,
}: {
  data: OrganizationUnitDto;
  isEditable: boolean;
  isSaving?: boolean;
  onSave: (data: FormValues) => void;
  onCancel: () => void;
}) {
  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      name: data.name || "",
      code: data.code || "",
      description: data.description || "",
    },
  });

  useEffect(() => {
    reset({
      name: data.name || "",
      code: data.code || "",
      description: data.description || "",
    });
  }, [data, reset]);

  return (
    <>
      {/* ... [ส่วนโค้ด DetailPanel เดิมแบบครบถ้วน ไม่มีการเปลี่ยนแปลง] ... */}
      <SidebarHeader className="font-semibold text-lg border-b pb-4">
        Organization Unit {isEditable ? "Edit" : "Detail"}
      </SidebarHeader>

      <SidebarContent className="p-4 overflow-y-auto">
        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            {isEditable ? (
              <Input
                id="name"
                placeholder="e.g. Engineering Department"
                disabled={isSaving}
                {...register("name")}
              />
            ) : (
              <div className="text-sm py-1.5 font-medium">{data.name || "-"}</div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="code">Code</Label>
            {isEditable ? (
              <Input
                id="code"
                placeholder="e.g. OU-ENG"
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
                placeholder="Add details about this unit..."
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
            <p className="font-medium text-foreground mb-2">System Information</p>
            <div className="grid grid-cols-3 gap-1">
              <span className="font-medium">Path:</span>
              <span className="col-span-2 truncate" title={data.path}>
                {data.path || "-"}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1">
              <span className="font-medium">Ref ID:</span>
              <span className="col-span-2 truncate" title={data.referenceId}>
                {data.referenceId || "-"}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1">
              <span className="font-medium">Created:</span>
              <span className="col-span-2">
                {data.createdOnUtc ? new Date(data.createdOnUtc).toLocaleString() : "-"}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1">
              <span className="font-medium">Modified:</span>
              <span className="col-span-2">
                {data.lastModifiedOnUtc ? new Date(data.lastModifiedOnUtc).toLocaleString() : "-"}
              </span>
            </div>
          </div>
        </div>
      </SidebarContent>

      <SidebarFooter className="border-t pt-4 mt-auto">
        <div className="flex w-full gap-2">
          {isEditable ? (
            <>
              <Button onClick={handleSubmit(onSave)} className="flex-1" disabled={isSaving}>
                {isSaving ? "Saving..." : "Save"}
              </Button>
              <Button variant="secondary" className="flex-1" onClick={onCancel} disabled={isSaving}>
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