import { useCallback, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BriefcaseIcon, TriangleAlertIcon } from "lucide-react";

import { apiClient } from "@/api/client";
import { createPositionMutationOptions } from "@/api/hooks/organizations/useCreatePosition";
import { deletePositionMutationOptions } from "@/api/hooks/organizations/useDeletePosition";
import {
  getAllDefaultPositionsQueryKey,
  getAllDefaultPositionsQueryOptions,
} from "@/api/hooks/organizations/useGetAllDefaultPositions";
import { updatePositionMutationOptions } from "@/api/hooks/organizations/useUpdatePosition";
import type { PositionDto } from "@/api/types/PositionDto";

import { useAppShell } from "@/app-shell/AppShell";
import { EntityForm, type EntityFormValues } from "./components/entity-form";
import { EntityList, type Column } from "./components/entity-list";
import { errorMessage, formatDate } from "./components/utils";

const columns: Column<PositionDto>[] = [
  {
    key: "name",
    header: "Name",
    render: (row) => <span className="font-medium">{row.name ?? "—"}</span>,
  },
  {
    key: "code",
    header: "Code",
    render: (row) => <span className="text-muted-foreground">{row.code ?? "—"}</span>,
  },
  {
    key: "description",
    header: "Description",
    render: (row) => (
      <span className="block max-w-72 truncate text-muted-foreground">
        {row.description ?? "—"}
      </span>
    ),
  },
  {
    key: "createdOnUtc",
    header: "Created",
    render: (row) => <span className="text-muted-foreground">{formatDate(row.createdOnUtc)}</span>,
  },
];

export function PositionPage() {
  const queryClient = useQueryClient();
  const { setPanelContent, setPanelOpen } = useAppShell();
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const listQuery = useQuery(getAllDefaultPositionsQueryOptions({ client: apiClient }));

  const createMutation = useMutation(createPositionMutationOptions({ client: apiClient }));
  const updateMutation = useMutation(updatePositionMutationOptions({ client: apiClient }));
  const deleteMutation = useMutation(deletePositionMutationOptions({ client: apiClient }));

  const invalidateList = useCallback(() => {
    void queryClient.invalidateQueries({ queryKey: getAllDefaultPositionsQueryKey() });
  }, [queryClient]);

  const closePanel = useCallback(() => {
    setPanelOpen(false);
    setPanelContent(undefined);
  }, [setPanelOpen, setPanelContent]);

  const openCreateForm = useCallback(() => {
    setDeleteError(null);
    setPanelContent(
      <EntityForm
        key="new"
        title="Add position"
        description="Create a new position in the organization."
        submitLabel="Create"
        saving={createMutation.isPending}
        error={createMutation.error ? errorMessage(createMutation.error) : null}
        onSubmit={(values) =>
          createMutation.mutate(
            {
              body: {
                code: values.code,
                name: values.name,
                description: values.description || null,
              },
            },
            {
              onSuccess: () => {
                invalidateList();
                closePanel();
              },
            },
          )
        }
        onCancel={closePanel}
      />,
    );
    setPanelOpen(true);
  }, [createMutation, invalidateList, closePanel, setPanelContent, setPanelOpen]);

  const openEditForm = useCallback(
    (row: PositionDto) => {
      setDeleteError(null);
      setPanelContent(
        <EntityForm
          key={row.referenceId ?? "edit"}
          title="Edit position"
          description="Update the details of this position."
          submitLabel="Save changes"
          initialValues={{
            code: row.code ?? "",
            name: row.name ?? "",
            description: row.description ?? "",
          }}
          saving={updateMutation.isPending}
          error={updateMutation.error ? errorMessage(updateMutation.error) : null}
          onSubmit={(values: EntityFormValues) =>
            updateMutation.mutate(
              {
                path: { positionId: row.referenceId ?? "" },
                body: {
                  code: values.code,
                  name: values.name,
                  description: values.description || null,
                },
              },
              {
                onSuccess: () => {
                  invalidateList();
                  closePanel();
                },
              },
            )
          }
          onCancel={closePanel}
        />,
      );
      setPanelOpen(true);
    },
    [updateMutation, invalidateList, closePanel, setPanelContent, setPanelOpen],
  );

  const handleDelete = useCallback(
    (row: PositionDto) => {
      setDeleteError(null);
      deleteMutation.mutate(
        { path: { positionId: row.referenceId ?? "" } },
        {
          onSuccess: () => invalidateList(),
          onError: (err) => setDeleteError(errorMessage(err)),
        },
      );
    },
    [deleteMutation, invalidateList],
  );

  return (
    <div className="flex flex-col gap-4">
      {deleteError && (
        <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
          <TriangleAlertIcon aria-hidden="true" className="size-3.5" />
          {deleteError}
        </div>
      )}

      <EntityList
        title="Position"
        description="Manage the positions available in the organization."
        icon={<BriefcaseIcon aria-hidden="true" className="size-5" />}
        columns={columns}
        data={listQuery.data}
        rowKey={(row) => row.referenceId ?? ""}
        isLoading={listQuery.isLoading}
        isError={listQuery.isError}
        errorMessage={listQuery.error ? errorMessage(listQuery.error) : null}
        onRefetch={() => void listQuery.refetch()}
        onAdd={openCreateForm}
        onEdit={openEditForm}
        onDelete={handleDelete}
      />
    </div>
  );
}