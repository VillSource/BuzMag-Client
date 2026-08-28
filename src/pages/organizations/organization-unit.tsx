import {
  getAllDefaultOrganizationUnitQueryKey,
  getAllDefaultOrganizationUnitQueryOptions,
} from "@/api/hooks/organizations/useGetAllDefaultOrganizationUnit";
import type { OrganizationUnitDto } from "@/api/types/OrganizationUnitDto";
import { updateOrganizationUnitMutationOptions } from "@/api/hooks/organizations/useUpdateOrganizationUnit";
import { deleteOrganizationUnitMutationOptions } from "@/api/hooks/organizations/useDeleteOrganizationUnit";
import { createOrganizationUnitMutationOptions } from "@/api/hooks/organizations/useCreateOrganizationUnit";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, Fragment, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useSessionStorage } from 'usehooks-ts'
import { useScrollRestoration } from "@/hooks/use-scrollRestoration";
import {
  ChevronRight,
  ChevronDown,
  Folder,
  File,
  Building2,
  RefreshCcw,
  Trash2,
  Pen,
  Plus,
  Check,
  ChevronsUpDown,
  MoreVertical,
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
  CommandList,
} from "@/components/ui/command";
import { apiClient } from "@/client";
import AppbarSlotContext from "@/app-shell/use-appbarSlot";
import { Kbd } from "@/components/ui/kbd";
import { useHotkeys } from "react-hotkeys-hook";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export type FormValues = {
  name: string;
  code: string;
  description: string;
};

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
    getAllDefaultOrganizationUnitQueryOptions({ client: apiClient }),
  );

  useScrollRestoration("org-unit-scroll", !isLoading && data !== undefined);

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

  const handleRowEdit = (item: OrganizationUnitDto) => {
    openOverlay(
      <OrganizationDetailContainer
        data={item}
        isEditable={true}
        key={`edit-${item.referenceId}`}
      />,
    );
  };

  const handleRowDelete = (item: OrganizationUnitDto) => {
    openOverlay(
      <OrganizationDeleteContainer
        data={item}
        key={`delete-${item.referenceId}`}
      />,
    );
  };

  const handleAddTopLevel = () => {
    openOverlay(
      <OrganizationCreateContainer
        allUnits={data || []}
        key={`create-top-level-${Date.now()}`}
      />,
    );
  };

  const handleRowAddChild = (item: OrganizationUnitDto) => {
    openOverlay(
      <OrganizationCreateContainer
        allUnits={data || []}
        initialParentId={item.referenceId}
        lockParent={true}
        key={`create-child-${item.referenceId}`}
      />,
    );
  };

  if (isError) {
    return <div className="p-8 text-red-500">Error loading data.</div>;
  }

  return (
    <div className="py-4">
      <div className="flex items-center justify-between mb-6 px-4">
        <h2 className="text-2xl font-bold tracking-tight">
          Organization Units
        </h2>
        <div className="flex gap-2">
          <AppbarSlotContext>
            <Button onClick={handleAddTopLevel} className="group/addbtn">
              <Plus className="h-4 w-4 " />
              Add
            </Button>
          </AppbarSlotContext>
          <Button variant="outline" onClick={() => refetch()}>
            <RefreshCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="sm:hidden px-2">
        <OrganizationList
          data={data || []}
          isLoading={isLoading}
          onRowEdit={handleRowEdit}
          onRowDelete={handleRowDelete}
          onRowAddChild={handleRowAddChild}
        />
      </div>
      <div className="hidden sm:block">
        <OrganizationTable
          data={data || []}
          isLoading={isLoading}
          onRowEdit={handleRowEdit}
          onRowDelete={handleRowDelete}
          onRowAddChild={handleRowAddChild}
        />
      </div>
    </div>
  );
}

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
  const mutation = useMutation(
    createOrganizationUnitMutationOptions({ client: apiClient }),
  );

  const handleSave = (formData: CreateOrganizationUnitCommand) => {
    mutation.mutate(
      {
        body: {
          ...formData,
          organizationId: null,
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
      },
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

function OrganizationDetailContainer({
  data,
  isEditable,
}: {
  data: OrganizationUnitDto;
  isEditable: boolean;
}) {
  const { setPanelOpen, setSheetOpen } = useAppShell();
  const queryClient = useQueryClient();
  const mutation = useMutation(
    updateOrganizationUnitMutationOptions({ client: apiClient }),
  );

  const handleSave = (formData: FormValues) => {
    mutation.mutate(
      { body: formData, path: { organizationUnitId: data.referenceId! } },
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

function OrganizationDeleteContainer({ data }: { data: OrganizationUnitDto }) {
  const { setPanelOpen, setSheetOpen } = useAppShell();
  const queryClient = useQueryClient();
  const mutation = useMutation(
    deleteOrganizationUnitMutationOptions({ client: apiClient }),
  );

  const handleConfirm = () => {
    mutation.mutate(
      { path: { organizationUnitId: data.referenceId! } },
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
              <TableCell
                colSpan={5}
                className="h-24 text-center text-muted-foreground"
              >
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
          <div
            className="flex items-center gap-2"
            style={{ paddingLeft: `${depth * 1.5}rem` }}
          >
            {hasChildren ? (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 shrink-0 p-0 hover:bg-muted"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
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
        <TableCell
          className="max-w-62.5 truncate text-muted-foreground"
          title={item.description || ""}
        >
          {item.description || "-"}
        </TableCell>
        <TableCell className="whitespace-nowrap">
          {item.referenceId ? item.referenceId : "-"}
        </TableCell>

        <TableCell className="text-center">
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
      {isOpen &&
        hasChildren &&
        item.children!.map((child) => (
          <OrgUnitTableRow
            key={child.referenceId || child.code || child.name}
            item={child}
            depth={depth + 1}
            onRowEditing={onRowEditing}
            onRowDelete={onRowDelete}
            onRowAddChild={onRowAddChild}
          />
        ))}
    </Fragment>
  );
}

function OrganizationList({
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
    <>
      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 rounded-lg border bg-card p-4 shadow-sm">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-3 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      ) : !data || data.length === 0 ? (
        <div className="rounded-lg border bg-card p-8 text-center text-muted-foreground shadow-sm">
          No organization units found.
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {data.map((item) => (
            <OrgUnitListCardMobile
              key={item.referenceId || item.code || item.name}
              item={item}
              onRowEditing={onRowEdit}
              onRowDelete={onRowDelete}
              onRowAddChild={onRowAddChild}
            />
          ))}
        </div>
      )}
    </>
  );
}

function OrgUnitListCardMobile({
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
  const [isOpen, setIsOpen] = useSessionStorage( `org-unit-list-node-explans:${item.referenceId}`, false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <Fragment>
      <div
        className={`flex items-start justify-between rounded-lg border bg-card p-3 shadow-sm relative ${
          depth === 0 ? "border-l-4 border-l-primary" : "border-l-2 border-l-border mt-1"
        }`}
        style={{ marginLeft: `${depth * 1}rem` }}
      >
        {/* Left Side: Toggle + Icon + Text Data */}
        <div className="flex items-start gap-2 overflow-hidden w-full pr-2">
          
          {/* Expand/Collapse Toggle */}
          <div className="mt-0.5 shrink-0">
            {hasChildren ? (
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5 p-0 hover:bg-muted"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </Button>
            ) : (
              <div className="h-5 w-5 shrink-0" /> // Invisible spacer to maintain alignment
            )}
          </div>

          {/* Node Icon */}
          <div className="mt-1 shrink-0">
            {depth === 0 ? (
              <Building2 className="h-4 w-4 text-primary" />
            ) : hasChildren ? (
              <Folder className="h-4 w-4 text-blue-500" />
            ) : (
              <File className="h-4 w-4 text-muted-foreground" />
            )}
          </div>

          {/* Text Information (Name, Code, Description) */}
          <div className="flex flex-col overflow-hidden">
            <span
              onClick={() => onRowEditing(item)}
              className="font-medium text-sm truncate cursor-pointer hover:underline"
            >
              {item.name || "-"} {item.code && <span className="text-muted-foreground font-normal">({item.code})</span>}
            </span>
            
            {item.description && (
              <span className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                {item.description}
              </span>
            )}
          </div>
        </div>

        {/* Right Side: Action Menu (Dropdown) */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 -mr-1 text-muted-foreground hover:text-foreground">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onClick={() => onRowAddChild(item)}>
              <Plus className="mr-2 h-4 w-4 text-green-600 dark:text-green-500" />
              <span>Add Child</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem onClick={() => onRowEditing(item)}>
              <Pen className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-500" />
              <span>Edit</span>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem 
              onClick={() => onRowDelete(item)} 
              className="text-destructive focus:text-destructive focus:bg-destructive/10"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Recursive Children Rendering */}
      {isOpen &&
        hasChildren &&
        item.children!.map((child) => (
          <OrgUnitListCardMobile
            key={child.referenceId || child.code || child.name}
            item={child}
            depth={depth + 1}
            onRowEditing={onRowEditing}
            onRowDelete={onRowDelete}
            onRowAddChild={onRowAddChild}
          />
        ))}
    </Fragment>
  );
}

function flattenOrgUnits(
  units: OrganizationUnitDto[]
): { value: string; label: string }[] {
  let result: { value: string; label: string }[] = [];
  units.forEach((u) => {
    const currentLabel = u.name || "Unknown";
    if (u.referenceId) {
      result.push({ value: u.referenceId, label: currentLabel });
    }
    if (u.children && u.children.length > 0) {
      result = result.concat(flattenOrgUnits(u.children));
    }
  });
  return result;
}

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

  const parentOptions = useMemo(() => flattenOrgUnits(allUnits), [allUnits]);

  const { register, handleSubmit, setValue, watch, setFocus } =
    useForm<CreateOrganizationUnitCommand>({
      defaultValues: {
        name: "",
        code: "",
        description: "",
        parentId: initialParentId || null,
        organizationId: null,
      },
    });

  const watchParentId = watch("parentId");

  useEffect(() => {
    const timer = setTimeout(() => {
      setFocus("name");
    }, 400);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        clearTimeout(timer);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setFocus]);

  useHotkeys(
    "ctrl+s, meta+s",
    (e) => {
      e.preventDefault();
      handleSubmit(onSave)();
    },
    { enableOnFormTags: true },
  );

  return (
    <>
      <SidebarHeader className="font-semibold text-lg border-b pb-4">
        {lockParent
          ? "Add Child Organization Unit"
          : "Create Organization Unit"}
      </SidebarHeader>

      <SidebarContent className="p-4 overflow-y-auto">
        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              Name <span className="text-destructive">*</span>
            </Label>
            <Input
              autoComplete="off"
              id="name"
              placeholder="Engineering Department"
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
              autoComplete="off"
              id="code"
              placeholder="OU-ENG"
              disabled={isSaving}
              required
              {...register("code")}
            />
          </div>

          <div className="space-y-2 flex flex-col">
            <Label>Parent Unit</Label>
            <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
              <PopoverTrigger>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openCombobox}
                  disabled={lockParent || isSaving}
                  className="w-full justify-between font-normal text-left truncate"
                >
                  {watchParentId
                    ? parentOptions.find((o) => o.value === watchParentId)
                        ?.label
                    : "None (Top Level)"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-75 p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search organization unit..." />
                  <CommandList>
                    <CommandEmpty>No unit found.</CommandEmpty>
                    <CommandGroup>
                      <CommandItem
                        value=""
                        onSelect={() => {
                          setValue("parentId", null);
                          setOpenCombobox(false);
                        }}
                      >
                        <Check
                          className={`mr-2 h-4 w-4 ${!watchParentId ? "opacity-100" : "opacity-0"}`}
                        />
                        None (Top Level)
                      </CommandItem>
                      {parentOptions.map((option) => (
                        <CommandItem
                          key={option.value}
                          value={option.label}
                          onSelect={() => {
                            setValue("parentId", option.value);
                            setOpenCombobox(false);
                          }}
                        >
                          <Check
                            className={`mr-2 h-4 w-4 ${watchParentId === option.value ? "opacity-100" : "opacity-0"}`}
                          />
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
            <Textarea
              id="description"
              placeholder="Add details about this unit..."
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
            {isSaving ? "Creating..." : "Create"}{" "}
            {!isSaving && (
              <Kbd className="bg-background/10 text-primary-foreground">
                ctl+s
              </Kbd>
            )}
          </Button>
          <Button
            variant="secondary"
            className="flex-1"
            onClick={onCancel}
            disabled={isSaving}
          >
            Cancel<Kbd className="bg-background/10">esc</Kbd>
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
  data: OrganizationUnitDto;
  isDeleting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  useHotkeys(
    "enter",
    (e) => {
      e.preventDefault();
      onConfirm();
    },
    { enableOnFormTags: true },
  );

  return (
    <>
      <SidebarHeader className="font-semibold text-lg border-b pb-4 text-destructive">
        Confirm Deletion
      </SidebarHeader>

      <SidebarContent className="p-4 overflow-y-auto">
        <div className="flex flex-col gap-4">
          <p className="text-sm">
            Are you sure you want to delete the following organization unit?
            This action cannot be undone.
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
              Warning: This unit contains {data.children.length} child unit(s).
              Deleting it might affect them.
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
            {!isDeleting && (
              <Kbd className="bg-primary/10 text-destructive-foreground">↵</Kbd>
            )}
          </Button>
          <Button
            variant="secondary"
            className="flex-1"
            onClick={onCancel}
            disabled={isDeleting}
          >
            Cancel<kbd className="bg-background/20">esc</kbd>
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
  data: OrganizationUnitDto;
  isEditable: boolean;
  isSaving?: boolean;
  onSave: (data: FormValues) => void;
  onCancel: () => void;
}) {
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      name: data.name || "",
      code: data.code || "",
      description: data.description || "",
    },
  });

  useHotkeys(
    "ctrl+s, meta+s",
    (e) => {
      if (!isEditable) return;
      e.preventDefault();
      handleSubmit(onSave)();
      console.log(onSave);
    },
    { enableOnFormTags: true },
  );

  return (
    <>
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
                placeholder="Engineering Department"
                disabled={isSaving}
                autoComplete="off"
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
                placeholder="OU-ENG"
                disabled={isSaving}
                autoComplete="off"
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
            <p className="font-medium text-foreground mb-2">
              System Information
            </p>
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
                {isSaving ? "Saving..." : "Save"}{" "}
                {!isSaving && (
                  <kbd className="bg-background/10 text-primary-foreground">
                    ctl+s
                  </kbd>
                )}
              </Button>
              <Button
                variant="secondary"
                className="flex-1"
                onClick={onCancel}
                disabled={isSaving}
              >
                Cancel <Kbd>esc</Kbd>
              </Button>
            </>
          ) : (
            <Button variant="secondary" className="flex-1" onClick={onCancel}>
              Close <Kbd>esc</Kbd>
            </Button>
          )}
        </div>
      </SidebarFooter>
    </>
  );
}
