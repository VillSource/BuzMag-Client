import {
  getAllDefaultOrganizationUnitQueryKey,
  getAllDefaultOrganizationUnitQueryOptions,
} from "@/api/hooks/organizations/useGetAllDefaultOrganizationUnit";
import type { OrganizationUnitDto } from "@/api/types/OrganizationUnitDto";
import { updateOrganizationUnitMutationOptions } from "@/api/hooks/organizations/useUpdateOrganizationUnit";
import { deleteOrganizationUnitMutationOptions } from "@/api/hooks/organizations/useDeleteOrganizationUnit";
// TODO: นำเข้า Hook สำหรับ Create ให้ถูกต้องตาม path ของคุณ
import { createOrganizationUnitMutationOptions } from "@/api/hooks/organizations/useCreateOrganizationUnit";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, Fragment, useEffect, useMemo } from "react";
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
  Plus, // เพิ่มไอคอน Plus
  Check, // ไอคอนสำหรับ Combobox
  ChevronsUpDown, // ไอคอนสำหรับ Combobox
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

// นำเข้า Component สำหรับสร้าง Searchable Select (Combobox)
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList, // <-- ต้องใส่เพื่อรองรับการเลื่อนใน shadcn เวอร์ชั่นใหม่
} from "@/components/ui/command";
import { apiClient } from "@/client";
import { Kbd } from "@/components/ui/kbd";
import AppbarSlotContext from "@/app-shell/use-appbarSlot";

// Schema สำหรับอัปเดต (ของเดิม)
export type FormValues = {
  name: string;
  code: string;
  description: string;
};

// Schema สำหรับสร้างใหม่ (ตามที่คุณกำหนด)
export type CreateOrganizationUnitCommand = {
  code: string;
  name: string;
  description?: string | null;
  parentId?: string | null;
  organizationId?: string | null;
};

/* =========================================================================
   SMART COMPONENTS (Containers)
   ========================================================================= */

export function OrganizationUnitPage() {
  const { data, isLoading, isError, refetch } = useQuery(
    getAllDefaultOrganizationUnitQueryOptions({client:apiClient}),
  );

  const { setPanelContent, setPanelOpen, setSheetContent, setSheetOpen } = useAppShell();
  const isMobile = useIsMobile();

  useEffect(() => {
    return () => {
      setPanelContent(undefined);
      setPanelOpen(false);
    };
  }, [setPanelContent, setPanelOpen]);

  // Helper สำหรับเปิด Panel/Sheet
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

  const handleRowEdit = (item: OrganizationUnitDto) => {
    openOverlay(<OrganizationDetailContainer data={item} isEditable={true} key={`edit-${item.referenceId}`} />);
  };

  const handleRowDelete = (item: OrganizationUnitDto) => {
    openOverlay(<OrganizationDeleteContainer data={item} key={`delete-${item.referenceId}`} />);
  };

  const handleAddTopLevel = () => {
    openOverlay(
      <OrganizationCreateContainer 
        allUnits={data || []} 
        key={`create-top-level-${Date.now()}`} 
      />
    );
  };

  // 🌟 ฟังก์ชันสำหรับ Add Child (ล็อก Parent ID)
  const handleRowAddChild = (item: OrganizationUnitDto) => {
    openOverlay(
      <OrganizationCreateContainer 
        allUnits={data || []} 
        initialParentId={item.referenceId} 
        lockParent={true} 
        key={`create-child-${item.referenceId}`} 
      />
    );
  };

  if (isError) {
    return <div className="p-8 text-red-500">Error loading data.</div>;
  }

  return (
    <div className="py-4">
      <div className="flex items-center justify-between mb-6 px-4">
        <h2 className="text-2xl font-bold tracking-tight">Organization Units</h2>
        <div className="flex gap-2">
          <AppbarSlotContext>
            <Button onClick={handleAddTopLevel} >
                <Plus className="h-4 w-4 " />
                Add 
            </Button>
          </AppbarSlotContext>
          <Button variant="outline" onClick={() => refetch()}>
            <RefreshCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="md:px-4">
        <OrganizationTable
          data={data || []}
          isLoading={isLoading}
          onRowEdit={handleRowEdit}
          onRowDelete={handleRowDelete}
          onRowAddChild={handleRowAddChild} // ส่ง Prop ลงไป
        />
      </div>
    </div>
  );
}

// 🌟 Container ใหม่สำหรับการสร้าง
function OrganizationCreateContainer({
  allUnits,
  initialParentId = null,
  lockParent = false,
}: {
  allUnits: OrganizationUnitDto[];
  initialParentId?: string | null;
  lockParent?: boolean;
}) {
  const { setPanelOpen, setSheetOpen } = useAppShell();
  const queryClient = useQueryClient();
  const mutation = useMutation(createOrganizationUnitMutationOptions({client:apiClient}));

  const handleSave = (formData: CreateOrganizationUnitCommand) => {
    mutation.mutate(
      {
        body: {
          ...formData,
          organizationId: null, // บังคับให้เป็น null เสมอตาม Schema
        },
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
    <CreatePanel
      allUnits={allUnits}
      initialParentId={initialParentId}
      lockParent={lockParent}
      isSaving={mutation.isPending}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
}

// ... [ส่วนของ OrganizationDetailContainer และ OrganizationDeleteContainer คงเดิมไม่เปลี่ยนแปลง] ...
function OrganizationDetailContainer({ data, isEditable }: { data: OrganizationUnitDto; isEditable: boolean }) {
  const { setPanelOpen, setSheetOpen } = useAppShell();
  const queryClient = useQueryClient();
  const mutation = useMutation(updateOrganizationUnitMutationOptions({client:apiClient}));

  const handleSave = (formData: FormValues) => {
    mutation.mutate({ body: formData, path: { organizationUnitId: data.referenceId! } }, {
      onSuccess: () => {
        setPanelOpen(false); setSheetOpen(false);
        queryClient.invalidateQueries({ queryKey: getAllDefaultOrganizationUnitQueryKey() });
      },
    });
  };

  const handleCancel = () => { setPanelOpen(false); setSheetOpen(false); };

  return <DetailPanel data={data} isEditable={isEditable} isSaving={mutation.isPending} onSave={handleSave} onCancel={handleCancel} />;
}

function OrganizationDeleteContainer({ data }: { data: OrganizationUnitDto }) {
  const { setPanelOpen, setSheetOpen } = useAppShell();
  const queryClient = useQueryClient();
  const mutation = useMutation(deleteOrganizationUnitMutationOptions({client:apiClient}));

  const handleConfirm = () => {
    mutation.mutate({ path: { organizationUnitId: data.referenceId! } }, {
      onSuccess: () => {
        setPanelOpen(false); setSheetOpen(false);
        queryClient.invalidateQueries({ queryKey: getAllDefaultOrganizationUnitQueryKey() });
      }
    });
  };

  const handleCancel = () => { setPanelOpen(false); setSheetOpen(false); };

  return <DeleteConfirmationPanel data={data} isDeleting={mutation.isPending} onConfirm={handleConfirm} onCancel={handleCancel} />;
}

/* =========================================================================
   DUMB COMPONENTS (Presentational)
   ========================================================================= */

function OrganizationTable({
  data,
  isLoading,
  onRowEdit,
  onRowDelete,
  onRowAddChild,
}: {
  data: OrganizationUnitDto[];
  isLoading: boolean;
  onRowEdit: (item: OrganizationUnitDto) => void;
  onRowDelete: (item: OrganizationUnitDto) => void;
  onRowAddChild: (item: OrganizationUnitDto) => void;
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
            <TableRow><TableCell colSpan={5}><Skeleton className="h-24 w-full" /></TableCell></TableRow>
          ) : !data || data.length === 0 ? (
            <TableRow><TableCell colSpan={5} className="h-24 text-center text-muted-foreground">No organization units found.</TableCell></TableRow>
          ) : (
            data.map((item) => (
              <OrgUnitTableRow
                key={item.referenceId || item.code || item.name}
                item={item}
                onRowEditing={onRowEdit}
                onRowDelete={onRowDelete}
                onRowAddChild={onRowAddChild}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function OrgUnitTableRow({
  item,
  depth = 0,
  onRowEditing,
  onRowDelete,
  onRowAddChild,
}: {
  item: OrganizationUnitDto;
  depth?: number;
  onRowEditing: (item: OrganizationUnitDto) => void;
  onRowDelete: (item: OrganizationUnitDto) => void;
  onRowAddChild: (item: OrganizationUnitDto) => void;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <Fragment>
      <TableRow className={depth === 0 ? "bg-muted/20 hover:bg-muted/40" : ""}>
        <TableCell>
          <div className="flex items-center gap-2" style={{ paddingLeft: `${depth * 1.5}rem` }}>
            {hasChildren ? (
              <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0 p-0 hover:bg-muted" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </Button>
            ) : <div className="h-6 w-6 shrink-0" />}
            {depth === 0 ? <Building2 className="h-4 w-4 text-primary shrink-0" /> : hasChildren ? <Folder className="h-4 w-4 text-blue-500 shrink-0" /> : <File className="h-4 w-4 text-muted-foreground shrink-0" />}
            <span onClick={() => onRowEditing(item)} className="font-medium whitespace-nowrap cursor-pointer hover:underline">
              {item.name || "-"}
            </span>
          </div>
        </TableCell>
        <TableCell className="font-mono text-xs">{item.code || "-"}</TableCell>
        <TableCell className="max-w-[250px] truncate text-muted-foreground" title={item.description || ""}>{item.description || "-"}</TableCell>
        <TableCell className="whitespace-nowrap">{item.referenceId ? item.referenceId : "-"}</TableCell>
        
        <TableCell className="text-center">
          {/* 🌟 ปุ่มเพิ่ม Child ประจำแถว */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-green-600 hover:text-green-900 hover:bg-green-600/10"
            onClick={() => onRowAddChild(item)}
            title="Add Child Unit"
          >
            <Plus className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-blue-600 hover:text-blue-900 hover:bg-blue-600/10"
            onClick={() => onRowEditing(item)}
            title="Edit Organization Unit"
          >
            <Pen className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => onRowDelete(item)}
            title="Delete Organization Unit"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </TableCell>
      </TableRow>
      {isOpen && hasChildren && item.children!.map((child) => (
        <OrgUnitTableRow key={child.referenceId || child.code || child.name} item={child} depth={depth + 1} onRowEditing={onRowEditing} onRowDelete={onRowDelete} onRowAddChild={onRowAddChild} />
      ))}
    </Fragment>
  );
}

// 🌟 ฟังก์ชันช่วยในการคลี่ Tree เป็น Array แบนๆ เพื่อใส่ใน Combobox
function flattenOrgUnits(units: OrganizationUnitDto[], parentPath = ""): { value: string; label: string }[] {
  let result: { value: string; label: string }[] = [];
  units.forEach((u) => {
    const currentLabel = parentPath ? `${parentPath} > ${u.name}` : u.name || "Unknown";
    if (u.referenceId) {
      result.push({ value: u.referenceId, label: currentLabel });
    }
    if (u.children && u.children.length > 0) {
      result = result.concat(flattenOrgUnits(u.children, currentLabel));
    }
  });
  return result;
}

// 🌟 Panel สำหรับการสร้างข้อมูลใหม่
function CreatePanel({
  allUnits,
  initialParentId,
  lockParent,
  isSaving = false,
  onSave,
  onCancel,
}: {
  allUnits: OrganizationUnitDto[];
  initialParentId?: string | null;
  lockParent?: boolean;
  isSaving?: boolean;
  onSave: (data: CreateOrganizationUnitCommand) => void;
  onCancel: () => void;
}) {
  const [openCombobox, setOpenCombobox] = useState(false);

  // แปลงข้อมูล Tree ให้กลายเป็น List สำหรับค้นหา
  const parentOptions = useMemo(() => flattenOrgUnits(allUnits), [allUnits]);

  const { register, handleSubmit, setValue, watch } = useForm<CreateOrganizationUnitCommand>({
    defaultValues: {
      name: "",
      code: "",
      description: "",
      parentId: initialParentId || null,
      organizationId: null,
    },
  });

  const watchParentId = watch("parentId");

  return (
    <>
      <SidebarHeader className="font-semibold text-lg border-b pb-4">
        {lockParent ? "Add Child Organization Unit" : "Create Organization Unit"}
      </SidebarHeader>

      <SidebarContent className="p-4 overflow-y-auto">
        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name <span className="text-destructive">*</span></Label>
            <Input id="name" placeholder="e.g. Engineering Department" disabled={isSaving} required {...register("name")} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="code">Code <span className="text-destructive">*</span></Label>
            <Input id="code" placeholder="e.g. OU-ENG" disabled={isSaving} required {...register("code")} />
          </div>

          {/* 🌟 Searchable Parent Field */}
          <div className="space-y-2 flex flex-col">
            <Label>Parent Unit</Label>
            <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
              <PopoverTrigger>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openCombobox}
                  disabled={lockParent || isSaving} // ล็อกฟิลด์ถ้าเป็นการกด + จากตาราง
                  className="w-full justify-between font-normal text-left truncate"
                >
                  {watchParentId
                    ? parentOptions.find((o) => o.value === watchParentId)?.label
                    : "None (Top Level)"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search organization unit..." />
                  <CommandList>
                    <CommandEmpty>No unit found.</CommandEmpty>
                    <CommandGroup>
                      {/* Option สำหรับเคลียร์ค่า (เป็น Top Level) */}
                      <CommandItem
                        value=""
                        onSelect={() => {
                          setValue("parentId", null);
                          setOpenCombobox(false);
                        }}
                      >
                        <Check className={`mr-2 h-4 w-4 ${!watchParentId ? "opacity-100" : "opacity-0"}`} />
                        None (Top Level)
                      </CommandItem>
                      {/* รายชื่อแผนกทั้งหมดแบบมี Breadcrumbs */}
                      {parentOptions.map((option) => (
                        <CommandItem
                          key={option.value}
                          value={option.label} // Command component ใช้ value ในการค้นหา (ดังนั้นใช้ label จะทำให้ค้นหาจากชื่อได้)
                          onSelect={() => {
                            setValue("parentId", option.value);
                            setOpenCombobox(false);
                          }}
                        >
                          <Check className={`mr-2 h-4 w-4 ${watchParentId === option.value ? "opacity-100" : "opacity-0"}`} />
                          {option.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Add details about this unit..." className="resize-none h-24" disabled={isSaving} {...register("description")} />
          </div>
        </div>
      </SidebarContent>

      <SidebarFooter className="border-t pt-4 mt-auto">
        <div className="flex w-full gap-2">
          <Button onClick={handleSubmit(onSave)} className="flex-1" disabled={isSaving}>
            {isSaving ? "Creating..." : "Create"}
          </Button>
          <Button variant="secondary" className="flex-1" onClick={onCancel} disabled={isSaving}>
            Cancel
          </Button>
        </div>
      </SidebarFooter>
    </>
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