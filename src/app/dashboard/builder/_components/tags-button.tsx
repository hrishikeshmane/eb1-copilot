import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContentNotPortal,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PlusCircledIcon, PlusIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { type ITag } from "@/server/db/schema";
import { api } from "@/trpc/react";

type TagsButtonProps = {
  selectedTags: ITag[];
  setSelectedTags: React.Dispatch<React.SetStateAction<ITag[]>>;
  disabled: boolean;
  isInteractable: boolean;
  availableTags: ITag[] | undefined;
};

const TagsButton = ({
  selectedTags,
  setSelectedTags,
  disabled,
  isInteractable,
  availableTags,
}: TagsButtonProps) => {
  const [openPillarsPopover, setOpenPillarsPopover] = React.useState(false);
  const [newTag, setNewTag] = React.useState("");
  const [allTags, setAllTags] = React.useState<ITag[]>(availableTags ?? []);

  const utils = api.useUtils();
  const createTagMutation = api.tag.createTag.useMutation({
    onSuccess: async (createdTag) => {
      console.log("Tag??", createdTag);
      toast.success("Tag created successfully");
      await utils.tag.getAllAvailableTags.invalidate();
      // get tags from queryclient
      const qTags = utils.tag.getAllAvailableTags.getData() as ITag[];
      setAllTags(qTags ?? allTags);
    },
    onError: (error) => {
      toast.error(`Failed to create a new tag- ${error.message}`);
    },
    onSettled: () => {
      setNewTag("");
    },
  });

  const handleCreateTag = async () => {
    if (!newTag.trim()) {
      toast.error("Please enter a tag name");
      return;
    }
    if (allTags.some((tag) => tag.name === newTag.trim())) {
      toast.error("Tag already exists");
      return;
    }
    createTagMutation.mutate({
      name: newTag.trim().toLowerCase(),
    });
  };

  return (
    <div className="w-full">
      {!isInteractable ? (
        <div className="flex w-full flex-wrap gap-1 font-mono text-xs">
          {selectedTags.length > 0 &&
            selectedTags.map((tag) => (
              <div
                key={tag.tagId}
                className="rounded-sm bg-secondary px-2 py-1 text-secondary-foreground"
              >
                {tag.name}
              </div>
            ))}
        </div>
      ) : (
        <Popover
          modal={true}
          open={openPillarsPopover}
          onOpenChange={setOpenPillarsPopover}
        >
          <PopoverTrigger asChild>
            <Button
              disabled={disabled}
              className="flex h-full w-full flex-wrap items-center justify-start gap-1"
              size={"sm"}
              variant="ghost"
            >
              <div className="flex w-full flex-wrap gap-1 font-mono ">
                {selectedTags.length == 0 && (
                  <div className="flex gap-1 rounded-sm px-2 py-1 text-foreground">
                    <PlusIcon className="" />
                    Tags
                  </div>
                )}
                {selectedTags.length > 0 &&
                  selectedTags.map((tag) => (
                    <div
                      key={tag.tagId}
                      className="rounded-sm bg-secondary px-2 py-1 text-secondary-foreground"
                    >
                      {tag.name}
                    </div>
                  ))}
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContentNotPortal
            className="h-full max-h-full p-0"
            side="bottom"
            align="start"
          >
            <Command>
              <CommandInput placeholder="Search tags..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Available Tags">
                  {allTags.map((tag) => (
                    <CommandItem
                      key={tag.tagId}
                      value={tag.tagId}
                      className="flex cursor-pointer items-center gap-2"
                      onSelect={() => {
                        const isSelected = selectedTags.some(
                          (t) => t.tagId === tag.tagId,
                        );
                        if (isSelected) {
                          setSelectedTags(
                            selectedTags.filter((t) => t.tagId !== tag.tagId),
                          );
                        } else {
                          setSelectedTags((prev) => [...prev, tag]);
                        }
                      }}
                    >
                      <Checkbox
                        id={tag.tagId}
                        checked={selectedTags.some(
                          (t) => t.tagId === tag.tagId,
                        )}
                      />
                      {tag.name ?? newTag}
                    </CommandItem>
                  ))}
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup>
                  <div className="flex items-center gap-2 p-2">
                    <Input
                      className="h-8"
                      placeholder="Enter new tag..."
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyDown={async (e) => {
                        if (e.key === "Enter") {
                          await handleCreateTag();
                        }
                      }}
                    />
                    <Button
                      className="h-7 w-8"
                      size="icon"
                      onClick={handleCreateTag}
                      disabled={!newTag.trim()}
                    >
                      <PlusCircledIcon />
                    </Button>
                  </div>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContentNotPortal>
        </Popover>
      )}
    </div>
  );
};

export default TagsButton;
