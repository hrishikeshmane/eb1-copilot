CREATE TABLE `eb1-copilot_comments` (
	`commentId` text(256) PRIMARY KEY NOT NULL,
	`ticketId` text(256) NOT NULL,
	`userId` text(256) NOT NULL,
	`content` text(2000) NOT NULL,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`ticketId`) REFERENCES `eb1-copilot_tickets`(`ticketId`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`userId`) REFERENCES `eb1-copilot_users`(`userId`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `eb1-copilot_tickets` (
	`ticketId` text(256) PRIMARY KEY NOT NULL,
	`title` text(256) NOT NULL,
	`description` text(2000),
	`customerId` text(256) NOT NULL,
	`pillars` blob NOT NULL,
	`column` text DEFAULT 'backlog' NOT NULL,
	`order` integer NOT NULL,
	`assigneeId` text(256),
	`createdBy` text(256) NOT NULL,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch()),
	FOREIGN KEY (`customerId`) REFERENCES `eb1-copilot_users`(`userId`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`assigneeId`) REFERENCES `eb1-copilot_users`(`userId`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`createdBy`) REFERENCES `eb1-copilot_users`(`userId`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `eb1-copilot_userInfo` (
	`userId` text PRIMARY KEY NOT NULL,
	`consent` integer NOT NULL,
	`fullName` text(126) NOT NULL,
	`email` text(126) NOT NULL,
	`phone` text(15) NOT NULL,
	`linkedIn` text(126) NOT NULL,
	`highestEducation` text NOT NULL,
	`major` text(50) NOT NULL,
	`brithCountry` text(50) NOT NULL,
	`nationalityCountry` text(50) NOT NULL,
	`hearAboutUs` text NOT NULL,
	`currentlyInUS` integer NOT NULL,
	`everBeenToUS` integer NOT NULL,
	`everAppliedForGreenCard` integer NOT NULL,
	`addFamilyMembers` integer NOT NULL,
	`currentEmployerInUS` integer NOT NULL,
	`currentVisa` text NOT NULL,
	`interestedIn` text NOT NULL,
	`isStudent` integer NOT NULL,
	`graduationYear` text NOT NULL,
	`currentRole` text(200) NOT NULL,
	`industryType` text NOT NULL,
	`priorityDateIfAny` text(300),
	`fieldExpertIn` text(50) NOT NULL,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch()),
	FOREIGN KEY (`userId`) REFERENCES `eb1-copilot_users`(`userId`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `eb1-copilot_userVisaPillarDetails` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text(256) NOT NULL,
	`pillar` text NOT NULL,
	`title` text(256) NOT NULL,
	`detail` text(2000) NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `eb1-copilot_users`(`userId`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `eb1-copilot_users` (
	`userId` text(256) PRIMARY KEY NOT NULL,
	`role` text NOT NULL,
	`onBoarded` integer NOT NULL,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch())
);
--> statement-breakpoint
CREATE TABLE `eb1-copilot_waitlist` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text(256)
);
--> statement-breakpoint
CREATE INDEX `customerId_idx` ON `eb1-copilot_tickets` (`customerId`);--> statement-breakpoint
CREATE UNIQUE INDEX `eb1-copilot_waitlist_email_unique` ON `eb1-copilot_waitlist` (`email`);