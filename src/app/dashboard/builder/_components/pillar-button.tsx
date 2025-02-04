import React from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { type IPillars, visaPillars } from "@/lib/constants";
import { PlusIcon } from "@radix-ui/react-icons";

type PillarButtonProps = {
  selectedPillars: IPillars[];
  setSelectedPillars: React.Dispatch<React.SetStateAction<IPillars[]>>;
  disabled: boolean;
  isInteractable: boolean;
};

const PillarButton = ({
  selectedPillars,
  setSelectedPillars,
  disabled,
  isInteractable,
}: PillarButtonProps) => {
  const [openPillarsPopover, setOpenPillarsPopover] = React.useState(false);

  return (
    <div className="w-full">
      {!isInteractable ? (
        <div className="flex w-full flex-wrap gap-1 font-mono text-xs">
          {selectedPillars.length > 0 &&
            selectedPillars.map((vp) => (
              <div
                key={vp.value}
                className="rounded-sm bg-secondary px-2 py-1 text-secondary-foreground"
              >
                {vp.label}
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
                {selectedPillars.length == 0 && (
                  <div className="flex gap-1 rounded-sm px-2 py-1 text-foreground">
                    <PlusIcon className="" />
                    Visa Pillars
                  </div>
                )}
                {selectedPillars.length > 0 &&
                  selectedPillars.map((vp) => (
                    <div
                      key={vp.value}
                      className="rounded-sm bg-secondary px-2 py-1 text-secondary-foreground"
                    >
                      {vp.label}
                    </div>
                  ))}
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="h-full max-h-full p-0"
            side="bottom"
            align="start"
          >
            <Command>
              <CommandInput placeholder="Select Pillars..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  <CommandItem onSelect={() => setSelectedPillars(visaPillars)}>
                    --Select All--
                  </CommandItem>
                  {visaPillars.map((status) => (
                    <CommandItem
                      key={status.value}
                      value={status.value}
                      className="flex items-center gap-2"
                      onSelect={(value) => {
                        const newPillar = visaPillars.find(
                          (pillar) => pillar.value === value,
                        );
                        if (!newPillar) return;

                        // if new pillar is already in the selectedPillars, remove it
                        if (
                          selectedPillars.some(
                            (pillar) => pillar.value === newPillar.value,
                          )
                        ) {
                          setSelectedPillars((prevState) =>
                            prevState.filter(
                              (pillar) => pillar.value !== newPillar.value,
                            ),
                          );
                          return;
                        }

                        setSelectedPillars((prevState) => [
                          ...prevState,
                          newPillar,
                        ]);
                      }}
                    >
                      <Checkbox
                        id={status.value}
                        checked={selectedPillars.some(
                          (pillar) => pillar.value === status.value,
                        )}
                      />
                      {status.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

export default PillarButton;
