"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  profileStatusOptions,
  type ProfileStatusOptionsValue,
} from "@/lib/constants";
import { Checkbox } from "@/components/ui/checkbox";
import { type Dispatch, type SetStateAction, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter name or email..."
          value={
            (table.getColumn("user.firstName")?.getFilterValue() as string) ??
            ""
          }
          onChange={(event) =>
            table
              .getColumn("user.firstName")
              ?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("profileStatus") && (
          <DataTableFacetedFilter
            column={table.getColumn("profileStatus")}
            title="Profile Status"
            options={profileStatusOptions}
          />
        )}
        {table.getColumn("user.customerType") && (
          <DataTableFacetedFilter
            column={table.getColumn("user.customerType")}
            title="Customer Type"
            options={[
              { label: "Autopilot", value: "autopilot" },
              { label: "Manual", value: "manual" },
            ]}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center space-x-2">
        {table.getSelectedRowModel().rows.length > 0 && (
          <>
            <BulkEditDialog table={table} />
            {/* <Dialog>
              <DialogTrigger asChild>
                <Button size={"sm"}>Bulk Edit</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Bulk Edit</DialogTitle>
                  <DialogDescription>
                    This action will affect{" "}
                    {table.getSelectedRowModel().rows.length} selected rows.
                    <br />
                    Make changes to your profile here. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value="Pedro Duarte"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Username
                    </Label>
                    <Input
                      id="username"
                      value="@peduarte"
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog> */}
          </>
        )}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}

const userFields = [
  {
    id: "accountManager",
    name: "Account Manager",
  },
  {
    id: "researchAssistant",
    name: "Research Assistant",
  },
  {
    id: "profileStatus",
    name: "Profile Status",
  },
  {
    id: "raIntroCallDone",
    name: "RA Intro Call Done",
  },
  {
    id: "attorneyCall",
    name: "Attorney Call Done",
  },
];

function BulkEditDialog<TData>({ table }: DataTableToolbarProps<TData>) {
  const [accountManager, setAccountManager] = useState<string | null>(null);
  const [researchAssistant, setResearchAssistant] = useState<string | null>(
    null,
  );
  const [profileStatus, setProfileStatus] =
    useState<ProfileStatusOptionsValue | null>(null);
  const [raIntroCallDone, setRaIntroCallDone] = useState<boolean | null>(null);
  const [attorneyCall, setAttorneyCall] = useState<boolean | null>(null);

  const [selectedFields, setSelectedFields] = useState<string[]>([]);

  const router = useRouter();

  const handleFieldToggle = (fieldId: string) => {
    setSelectedFields((prev) =>
      prev.includes(fieldId)
        ? prev.filter((id) => id !== fieldId)
        : [...prev, fieldId],
    );
  };

  const utils = api.useUtils();
  const batchUpdateCustomerDetailsMutation =
    api.userManagement.batchUpdateCustomerDetails.useMutation({
      onMutate: () => {
        toast.info(
          `Updating ${table.getSelectedRowModel().rows.length} Records`,
        );
      },
      onSuccess: async () => {
        toast.success(
          `Updated ${table.getSelectedRowModel().rows.length} Records`,
        );
      },
      onError: (error) => {
        toast.error(
          `Error while updating ${table.getSelectedRowModel().rows.length} Records. Error: ${error.message}`,
        );
      },
      onSettled: async () => {
        await utils.userManagement.getAllCustomerDetails.invalidate();
      },
    });

  const onSaveHandler = async () => {
    const selectedRows = table.getSelectedRowModel().rows;
    const userIds = selectedRows.map(
      (row) => (row.original as { userId: string }).userId,
    );
    const input = {
      userIds: userIds,
      accountManager: accountManager ?? undefined,
      researchAssistant: researchAssistant ?? undefined,
      raIntroCallDone: raIntroCallDone ?? undefined,
      attorneyCall: attorneyCall ?? undefined,
    };

    if (profileStatus === null || profileStatus === undefined) {
      batchUpdateCustomerDetailsMutation.mutate(input);
    } else {
      batchUpdateCustomerDetailsMutation.mutate({ ...input, profileStatus });
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button size={"sm"}>Bulk Edit</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Bulk Edit</DialogTitle>
            <DialogDescription>
              This action will affect {table.getSelectedRowModel().rows.length}{" "}
              selected rows.
              <br />
              Make changes to your profile here. Click save when you are done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            {userFields.map((field) => (
              <div key={field.id} className="flex items-center space-x-2">
                <Checkbox
                  id={field.id}
                  checked={selectedFields.includes(field.id)}
                  onCheckedChange={() => handleFieldToggle(field.id)}
                />
                <Label htmlFor={field.id}>{field.name}</Label>
              </div>
            ))}
          </div>
          <Separator />
          <div className="grid gap-4 py-4">
            {selectedFields.map((fieldId) => {
              if (fieldId === "accountManager") {
                return (
                  <div key={fieldId} className="flex flex-col gap-1">
                    <Label htmlFor="accountManager">Account Manager</Label>
                    <AccountManagerSelectOptions
                      setAccountManager={setAccountManager}
                    />
                  </div>
                );
              }
              if (fieldId === "researchAssistant") {
                return (
                  <div key={fieldId} className="flex flex-col gap-1">
                    <Label htmlFor="researchAssistant">
                      Research Assistant
                    </Label>
                    <ResearchAssistantSelectOptions
                      setResearchAssistant={setResearchAssistant}
                    />
                  </div>
                );
              }
              if (fieldId === "profileStatus") {
                return (
                  <div key={fieldId} className="flex flex-col gap-1">
                    <Label htmlFor="profileStatus">Profile Status</Label>
                    <ProfileStatusSelectOptions
                      setProfileStatus={setProfileStatus}
                    />
                  </div>
                );
              }
              if (fieldId === "raIntroCallDone") {
                return (
                  <div key={fieldId} className="flex flex-col gap-1">
                    <Label htmlFor="raIntroCallDone">RA Intro Call Done</Label>
                    <YesNoSelectOptions
                      key={fieldId}
                      setYesNo={setRaIntroCallDone}
                    />
                  </div>
                );
              }
              if (fieldId === "attorneyCall") {
                return (
                  <div key={fieldId} className="flex flex-col gap-1">
                    <Label htmlFor="attorneyCall">Attorney Call Done</Label>
                    <YesNoSelectOptions
                      key={fieldId}
                      setYesNo={setAttorneyCall}
                    />
                  </div>
                );
              }
            })}
          </div>
          <DialogFooter>
            <DialogClose>
              <Button type="submit" onClick={onSaveHandler}>
                Save changes
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

const AccountManagerSelectOptions = ({
  setAccountManager,
}: {
  setAccountManager: Dispatch<SetStateAction<string | null>>;
}) => {
  const adminUsers =
    api.userManagement.getAccountManagerAndResearchAssistants.useQuery();
  const AMs = adminUsers.data?.accountManagers;

  const handleSelectChange = async (AMId: string) => {
    setAccountManager(AMId);
  };

  return (
    <Select onValueChange={(value) => handleSelectChange(value)}>
      <SelectTrigger className="h-8 px-1 py-0">
        <SelectValue placeholder="Select Account Manager" />
      </SelectTrigger>
      <SelectContent>
        {AMs?.map((user) => (
          <SelectItem key={user.id} value={user.id}>
            {user.firstName + " " + user.lastName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

const ResearchAssistantSelectOptions = ({
  setResearchAssistant,
}: {
  setResearchAssistant: Dispatch<SetStateAction<string | null>>;
}) => {
  const adminUsers =
    api.userManagement.getAccountManagerAndResearchAssistants.useQuery();
  const RAs = adminUsers.data?.researchAssistants;

  const handleSelectChange = async (RAId: string) => {
    setResearchAssistant(RAId);
  };

  return (
    <Select onValueChange={(value) => handleSelectChange(value)}>
      <SelectTrigger className="h-8 px-1 py-0">
        <SelectValue placeholder="Select Research Assistant" />
      </SelectTrigger>
      <SelectContent>
        {RAs?.map((user) => (
          <SelectItem key={user.id} value={user.id}>
            {user.firstName + " " + user.lastName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

const ProfileStatusSelectOptions = ({
  setProfileStatus,
}: {
  setProfileStatus: Dispatch<SetStateAction<ProfileStatusOptionsValue | null>>;
}) => {
  const handleSelectChange = (value: ProfileStatusOptionsValue) => {
    setProfileStatus(value);
  };

  return (
    <Select
      onValueChange={(value) =>
        handleSelectChange(value as ProfileStatusOptionsValue)
      }
    >
      <SelectTrigger className="h-8 px-1 py-0">
        <SelectValue placeholder="Select Profile Status" />
      </SelectTrigger>
      <SelectContent>
        {profileStatusOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

const YesNoSelectOptions = ({
  setYesNo,
}: {
  setYesNo: Dispatch<SetStateAction<boolean | null>>;
}) => {
  const handleSelectChange = async (value: string) => {
    setYesNo(value === "Yes" ? true : false);
  };

  return (
    <Select onValueChange={(value) => handleSelectChange(value)}>
      <SelectTrigger className="h-8 px-1 py-0">
        <SelectValue placeholder="Select Yes/No" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={"Yes"}>Yes</SelectItem>
        <SelectItem value={"No"}>No</SelectItem>
      </SelectContent>
    </Select>
  );
};
