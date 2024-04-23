ALTER TABLE eb1-copilot_userInfo ADD `currentVisa` text NOT NULL;--> statement-breakpoint
ALTER TABLE eb1-copilot_userInfo ADD `isStudent` integer NOT NULL;--> statement-breakpoint
ALTER TABLE eb1-copilot_userInfo ADD `graduationYear` text NOT NULL;--> statement-breakpoint
ALTER TABLE eb1-copilot_userInfo ADD `currentRole` text(200) NOT NULL;--> statement-breakpoint
ALTER TABLE eb1-copilot_userInfo ADD `industryType` text NOT NULL;--> statement-breakpoint
ALTER TABLE eb1-copilot_userInfo ADD `priorityDateIfAny` text(50);--> statement-breakpoint
ALTER TABLE `eb1-copilot_userInfo` DROP COLUMN `everBeenJ1OrJ2`;--> statement-breakpoint
ALTER TABLE `eb1-copilot_userInfo` DROP COLUMN `haveCriminalRecord`;