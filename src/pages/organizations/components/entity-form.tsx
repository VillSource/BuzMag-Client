import { useState, type FormEvent } from "react";
import { XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export type EntityFormValues = {
  code: string;
  name: string;
  description: string;
};

type EntityFormProps = {
  title: string;
  description?: string;
  submitLabel?: string;
  initialValues?: EntityFormValues;
  saving?: boolean;
  error?: string | null;
  onSubmit: (values: EntityFormValues) => void;
  onCancel: () => void;
};

/**
 * Create / edit form rendered inside the right app panel.
 */
export function EntityForm({
  title,
  description: descriptionText,
  submitLabel = "Save",
  initialValues = { code: "", name: "", description: "" },
  saving = false,
  error = null,
  onSubmit,
  onCancel,
}: EntityFormProps) {
  const [code, setCode] = useState(initialValues.code);
  const [name, setName] = useState(initialValues.name);
  const [description, setDescription] = useState(initialValues.description);
  const [validation, setValidation] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !code.trim()) {
      setValidation("Name and code are required.");
      return;
    }
    setValidation(null);
    onSubmit({ code: code.trim(), name: name.trim(), description: description.trim() });
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-start justify-between gap-3 border-b px-4 py-3">
        <div className="min-w-0">
          <h3 className="font-heading text-sm font-semibold">{title}</h3>
          {descriptionText && (
            <p className="mt-0.5 text-xs text-muted-foreground">{descriptionText}</p>
          )}
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={onCancel}
          aria-label="Close"
          className="-me-1"
        >
          <XIcon aria-hidden="true" />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
        <div className="flex flex-col gap-4 px-4 py-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="entity-name">Name</Label>
            <Input
              id="entity-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Operations"
              autoFocus
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="entity-code">Code</Label>
            <Input
              id="entity-code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="e.g. OPS"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="entity-description">Description</Label>
            <Textarea
              id="entity-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional"
              rows={4}
            />
          </div>

          {(validation || error) && (
            <p role="alert" className="text-xs font-normal text-destructive">
              {validation ?? error}
            </p>
          )}
        </div>

        <div className="mt-auto flex items-center justify-end gap-2 border-t px-4 py-3">
          <Button type="button" variant="ghost" size="sm" onClick={onCancel} disabled={saving}>
            Cancel
          </Button>
          <Button type="submit" size="sm" disabled={saving}>
            {saving ? "Saving…" : submitLabel}
          </Button>
        </div>
      </form>
    </div>
  );
}
