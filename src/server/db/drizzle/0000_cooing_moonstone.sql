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
	`everBeenJ1OrJ2` integer NOT NULL,
	`haveCriminalRecord` integer NOT NULL,
	`addFamilyMembers` integer NOT NULL,
	`currentEmployerInUS` integer NOT NULL,
	`interestedIn` text NOT NULL,
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
CREATE UNIQUE INDEX `eb1-copilot_waitlist_email_unique` ON `eb1-copilot_waitlist` (`email`);