"use client";

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { PenSquare, Plus, Check } from 'lucide-react'
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface ISelectTickets {
  ticketId: string;
  title: string;
  description: string;
  customerId: string;
  pillars: string[];
  column: string;
  order: number;
  assigneeId: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

interface User {
  id: string;
  name: string;
}

const createDummyTickets = () => {
  const dummyTickets: ISelectTickets[] = [];
  for (let i = 0; i < 15; i++) {
    dummyTickets.push({
      ticketId: i.toString(),
      title: `Awards/press Ticket ${i}`,
      description: `Description for awards/press Ticket ${i}`,
      customerId: "customer-id",
      pillars: ["awards", "press"],
      column: "backlog",
      order: i,
      assigneeId: "assignee-id",
      createdBy: "created-by",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  for (let i = 0; i < 5; i++) {
    dummyTickets.push({
      ticketId: (i + "Original").toString(),
      title: `Original-contributions Ticket ${i}`,
      description: `Description for original-contributions Ticket ${i}`,
      customerId: "customer-id",
      pillars: ["original-contributions"],
      column: "backlog",
      order: i,
      assigneeId: "assignee-id",
      createdBy: "created-by",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  for (let i = 0; i < 5; i++) {
    dummyTickets.push({
      ticketId: (i + "Authorship").toString(),
      title: `Authorship Ticket ${i}`,
      description: `Description for authorship Ticket ${i}`,
      customerId: "customer-id",
      pillars: ["authorship"],
      column: "backlog",
      order: i,
      assigneeId: "assignee-id",
      createdBy: "created-by",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  for (let i = 0; i < 5; i++) {
    dummyTickets.push({
      ticketId: (i + "Judging").toString(),
      title: `Judging Ticket ${i}`,
      description: `Description for judging Ticket ${i}`,
      customerId: "customer-id",
      pillars: ["judging"],
      column: "backlog",
      order: i,
      assigneeId: "assignee-id",
      createdBy: "created-by",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
  }
  return dummyTickets;
};

const columns = [
  { id: 'awards', title: 'Awards' },
  { id: 'press', title: 'Press' },
  { id: 'original-contributions', title: 'Original Contributions' },
  { id: 'authorship', title: 'Authorship' },
  { id: 'judging', title: 'Judging' },
];

const users: User[] = [
  { id: 'user1', name: 'User 1' },
  { id: 'user2', name: 'User 2' },
  { id: 'user3', name: 'User 3' },
  { id: 'user4', name: 'User 4' },
];

export default function TestComponent() {
  const [tickets, setTickets] = useState<ISelectTickets[]>([]);
  const [editingTicket, setEditingTicket] = useState<ISelectTickets | null>(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [isNewTicketDialogOpen, setIsNewTicketDialogOpen] = useState(false);
  const [newTicketTitle, setNewTicketTitle] = useState('');
  const [newTicketDescription, setNewTicketDescription] = useState('');
  const [newTicketPillar, setNewTicketPillar] = useState('');
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [openCombobox, setOpenCombobox] = useState(false);

  useEffect(() => {
    setTickets(createDummyTickets());
  }, []);

  const toggleTicketCompletion = (ticketId: string) => {
    setTickets(tickets.map(ticket => 
      ticket.ticketId === ticketId ? { ...ticket, column: ticket.column === 'backlog' ? 'completed' : 'backlog' } : ticket
    ));
  };

  const openEditDialog = (ticket: ISelectTickets) => {
    setEditingTicket(ticket);
    setEditedTitle(ticket.title);
    setEditedDescription(ticket.description);
  };

  const closeEditDialog = () => {
    setEditingTicket(null);
  };

  const saveEditedTicket = () => {
    if (editingTicket) {
      setTickets(tickets.map(ticket => 
        ticket.ticketId === editingTicket.ticketId ? { ...ticket, title: editedTitle, description: editedDescription } : ticket
      ));
    }
    closeEditDialog();
  };

  const openNewTicketDialog = () => {
    setIsNewTicketDialogOpen(true);
  };

  const closeNewTicketDialog = () => {
    setIsNewTicketDialogOpen(false);
    setNewTicketTitle('');
    setNewTicketDescription('');
    setNewTicketPillar('');
  };

  const createNewTicket = () => {
    const newTicket: ISelectTickets = {
      ticketId: (tickets.length + 1).toString(),
      title: newTicketTitle,
      description: newTicketDescription,
      customerId: "customer-id",
      pillars: [newTicketPillar],
      column: "backlog",
      order: tickets.length,
      assigneeId: "assignee-id",
      createdBy: "created-by",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTickets([...tickets, newTicket]);
    closeNewTicketDialog();
  };

  const toggleTicketSelection = (ticketId: string) => {
    setSelectedTickets(prev => 
      prev.includes(ticketId) ? prev.filter(id => id !== ticketId) : [...prev, ticketId]
    );
  };

  const assignTicketsToUsers = () => {
    if (selectedTickets.length > 0 && selectedUsers.length > 0) {
      setTickets(tickets.map(ticket => 
        selectedTickets.includes(ticket.ticketId) ? { ...ticket, assigneeId: selectedUsers.join(',') } : ticket
      ));
      setSelectedTickets([]);
      setSelectedUsers([]);
    }
  };

  return (
    <div className="p-4 pl-0 pt-0">
      <div className="flex justify-between mb-4">
        <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openCombobox}
              className="w-[300px] justify-between"
            >
              {selectedUsers.length > 0
                ? `${selectedUsers.length} user${selectedUsers.length > 1 ? 's' : ''} selected`
                : "Select users..."}
              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0">
            <Command>
              <CommandInput placeholder="Search users..." className="h-9" />
              <CommandList>
                <CommandEmpty>No user found.</CommandEmpty>
                <CommandGroup>
                  {users.map((user) => (
                    <CommandItem
                      key={user.id}
                      value={user.id}
                      onSelect={(currentValue) => {
                        setSelectedUsers((prev) =>
                          prev.includes(currentValue)
                            ? prev.filter((id) => id !== currentValue)
                            : [...prev, currentValue]
                        )
                      }}
                    >
                      {user.name}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedUsers.includes(user.id) ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        {selectedTickets.length > 0 && (
            <div className="">
                <Button onClick={assignTicketsToUsers} variant={"secondary"}>
                    <Check className="mr-2 h-4 w-4" /> Assign {selectedTickets.length} ticket(s) to {selectedUsers.length} user(s)
                </Button>
            </div>
        )}
        <Button onClick={openNewTicketDialog}>
          <Plus className="mr-2 h-4 w-4" /> New Ticket
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <div className="flex space-x-2 min-w-max">
          {columns.map(column => (
            <div key={column.id} className="w-72 flex-shrink-0">
              <h2 className="text-sm font-semibold mb-2 bg-gray-200 p-1 rounded">{column.title}</h2>
              <ScrollArea className="h-[calc(100vh-170px)]">
                <div className="space-y-2">
                  {tickets.filter(ticket => ticket.pillars.includes(column.id)).map(ticket => (
                    <Card key={ticket.ticketId} className="w-full px-2">
                      <CardContent className="p-2">
                        <div className="flex items-center justify-between space-x-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              checked={selectedTickets.includes(ticket.ticketId)}
                              onCheckedChange={() => toggleTicketSelection(ticket.ticketId)}
                              className="h-4 w-4"
                            />
                            <span className="text-xs font-medium truncate max-w-[150px]">{ticket.title}</span>
                          </div>
                          <Button variant="ghost" size="icon" className="h-6 w-6 p-0" onClick={() => openEditDialog(ticket)}>
                            <PenSquare className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{ticket.description}</p>
                        <p className="text-xs text-gray-400 mt-1">Assignee: {ticket.assigneeId}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={editingTicket !== null} onOpenChange={closeEditDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Ticket</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={saveEditedTicket}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isNewTicketDialogOpen} onOpenChange={closeNewTicketDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Ticket</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newTitle" className="text-right">
                Title
              </Label>
              <Input
                id="newTitle"
                value={newTicketTitle}
                onChange={(e) => setNewTicketTitle(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newDescription" className="text-right">
                Description
              </Label>
              <Input
                id="newDescription"
                value={newTicketDescription}
                onChange={(e) => setNewTicketDescription(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newPillar" className="text-right">
                Pillar
              </Label>
              <select
                id="newPillar"
                value={newTicketPillar}
                onChange={(e) => setNewTicketPillar(e.target.value)}
                className="col-span-3"
              >
                <option value="">Select a pillar</option>
                {columns.map(column => (
                  <option key={column.id} value={column.id}>{column.title}</option>
                ))}
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={createNewTicket}>Create Ticket</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}