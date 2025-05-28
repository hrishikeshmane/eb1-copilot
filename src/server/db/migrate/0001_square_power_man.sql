CREATE TABLE `eb1-copilot_customerDetails` (
	`userId` text PRIMARY KEY NOT NULL,
	`accountManager` text(256),
	`researchAssistant` text(256),
	`customerType` text,
	`dueDate` blob DEFAULT (date('now')),
	`raIntroCallDone` integer DEFAULT false,
	`attorneyCall` integer DEFAULT false,
	`profileStatus` text DEFAULT 'onboarding',
	FOREIGN KEY (`userId`) REFERENCES `eb1-copilot_users`(`userId`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`accountManager`) REFERENCES `eb1-copilot_users`(`userId`) ON UPDATE no action ON DELETE restrict,
	FOREIGN KEY (`researchAssistant`) REFERENCES `eb1-copilot_users`(`userId`) ON UPDATE no action ON DELETE restrict
);
--> statement-breakpoint
CREATE TABLE `eb1-copilot_masterList` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text(256) NOT NULL,
	`description` text(2000) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `eb1-copilot_masterListTickets` (
	`ticketId` text(256) PRIMARY KEY NOT NULL,
	`masterListId` text(256) NOT NULL,
	`title` text(256) NOT NULL,
	`description` text(2000),
	`pillars` blob NOT NULL,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch()),
	FOREIGN KEY (`masterListId`) REFERENCES `eb1-copilot_masterList`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `eb1-copilot_tags` (
	`tagId` text(256) PRIMARY KEY NOT NULL,
	`name` text(256) NOT NULL,
	`color` text(256) NOT NULL,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `eb1-copilot_ticket_tags` (
	`ticketId` text(256) NOT NULL,
	`tagId` text(256) NOT NULL,
	PRIMARY KEY(`tagId`, `ticketId`),
	FOREIGN KEY (`ticketId`) REFERENCES `eb1-copilot_tickets`(`ticketId`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`tagId`) REFERENCES `eb1-copilot_tags`(`tagId`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
ALTER TABLE `eb1-copilot_tickets` ADD `masterTickedId` text(256) DEFAULT null;--> statement-breakpoint
ALTER TABLE `eb1-copilot_tickets` ADD `dueDate` blob DEFAULT null;--> statement-breakpoint
ALTER TABLE `eb1-copilot_userInfo` ADD `resumeUrl` text(256);--> statement-breakpoint
ALTER TABLE `eb1-copilot_userInfo` ADD `resumeContent` text(8000);--> statement-breakpoint
ALTER TABLE `eb1-copilot_users` ADD `firstName` text(256);--> statement-breakpoint
ALTER TABLE `eb1-copilot_users` ADD `lastName` text(256);--> statement-breakpoint
ALTER TABLE `eb1-copilot_users` ADD `username` text(256);--> statement-breakpoint
ALTER TABLE `eb1-copilot_users` ADD `hasImage` integer DEFAULT false;--> statement-breakpoint
ALTER TABLE `eb1-copilot_users` ADD `imageUrl` text(256);--> statement-breakpoint
ALTER TABLE `eb1-copilot_users` ADD `primaryEmailAddressId` text(256);--> statement-breakpoint
ALTER TABLE `eb1-copilot_users` ADD `emailAddresses` text;--> statement-breakpoint
ALTER TABLE `eb1-copilot_users` ADD `publicMetadata` text;--> statement-breakpoint
ALTER TABLE `eb1-copilot_users` ADD `priorityCallSheduled` integer DEFAULT false;--> statement-breakpoint
ALTER TABLE `eb1-copilot_users` ADD `customerPaid` integer DEFAULT false;--> statement-breakpoint
ALTER TABLE `eb1-copilot_users` ADD `customerType` text DEFAULT 'unpaid';--> statement-breakpoint
ALTER TABLE `eb1-copilot_users` ADD `disableOnboardingForm` integer DEFAULT false;--> statement-breakpoint
ALTER TABLE `eb1-copilot_users` ADD `dataRoomLink` text(256);--> statement-breakpoint
CREATE INDEX `masterListId_idx` ON `eb1-copilot_masterListTickets` (`masterListId`);--> statement-breakpoint
CREATE INDEX `ticketId_idx` ON `eb1-copilot_ticket_tags` (`ticketId`);--> statement-breakpoint
CREATE INDEX `tagId_idx` ON `eb1-copilot_ticket_tags` (`tagId`);