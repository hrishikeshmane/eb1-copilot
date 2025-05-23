import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { google } from 'googleapis';
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { users } from "@/server/db/schema";

const dataroomInput = z.object({
  name: z.string(),
  userId: z.string(),
  userEmail: z.string(),
});

const GOOGLE_PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCQSQ44uAchjAqo\nxpp4DjPNKx74UYdoBuuTM4da17fRwQVLaWmHMpMSWR47DiPkIcNeNHCKq6eK9bGa\nMySVq6FTaIQtUjPEIvcWGSu3wiEz2NZ1ctFvc/dzGpnyV4ENBWSYbWTad5uOxgY3\nSFCn14Ddd9IDeW7jp8TPjOWk4vRXJaIxdbZtJEVHBgg0tTgelgAtyYC+Ex2MoSeD\njlVZ9dfeY8s+nMo+9L4mVHEXs7xel25hMVVvuaT89Fp7QHCCYTNj8G8k7U+Z/T5U\n4QWqexRLogRiesT1x+V/pFJMM5o5R+9+i36iubAo8BhEsQ2gbCtQICPulp5+Dych\nC2aukiRfAgMBAAECggEAMImK8bSinXvtSAqLgzCP54iGghV3Hh0Z2Wp/saUYzsSG\ngfBjkhoG1KjLHSWsGD3taX7tjxCgq4Psa4mh2IGkoxjpQg/Bn0z93t630LjLD5R1\nzIvD/aC+0OdVe2tJW/aA+S/vufh7iYN/KtC2ZUf/L0F0Ejwi/A1/jSyCQj4g4UGj\n2M9s40aGwnTZyuJ1NmabPZBaMt+JcBzJEhdyxZphFQxScV9yPe+K4vGQPf80QuG7\n/ldfidD404I/fk1BTHy1teZf4Y26U2SfY5Yz5gRl2Q2rS9FaWafLnJl9g2R9xbMC\nt66WGZflEwQBf9TKJOFxg+NWkipW+Lmo1fbKaFTNEQKBgQDGKOJtJwMFuDhV3/t8\n8IbgtMQnTPcyM1YpIH7c0urg7ECzZjU8HRoY+ncTsRHvzeeXfWh7c4FyZgV7hPxZ\nM8VYVvRw55DNUHTI8SFysfuj7WUC4/RTUTC8AgnYC6aEq5rubBvIEpTUJ6jJs//D\nrSZHfR/ANY5JUUAu4R2sOA8cjwKBgQC6ZoMFhb8I+4MX9HLxw07S4RLGgNQnmFG+\nbLcnI8ETk1zN0tINOxVQ5JYMdz/JWQOYz+agJ/qCFxMQoYadLsfctzrlmyYV8pKd\nmVR7+I7oTqM7dG1NaHxqvRn61kYcX4byiZ9Udt13zUStOIm9Qm4Fh4yzkkjx8goe\noBcnsCgDMQKBgExSjvNvpTBcxgX9YQW8NpbxyONCN6u0LillBLfU3PaIyFrQsQxY\nQScBwT9qYfg1HFAy0z1JPcBsHwx2KiPJVucxhrC93/3UUUbb6QAeIUgANXmphv9Y\nNCcVuejmg9pxphjSttiWn5AfPlmB5K7fT/EU9le3yPfgPZJQznb4mIltAoGAecHm\nid/whnSMEES8JJIYVgVxVzrl2itUEhg/lxBy2U+kCkpQrRXP+bQnE2N9xg8gG1yK\nYEldCEb8TBvGq7vYD6OclEjBGwsFnG6A0i3tY2+ijn6huzOqOarmYoQ+7d+0bY9a\nBTlTtyLdXm0VBAx1g6UkUlQW0/vvgku+dE1MBbECgYEAsV6ThLZJfmvIWNiPIEQF\nBvrRosuL1PPegmaItrsVcJiz9pbRAtdmcVKbzU+JPveeUz7SSWwq8/C7VMKxKb0V\n/xyi0rUAQ9geNkbf/QDyuj61aSIHpH9wobE8fv9wC8JOwcdToTOohwuT8JjYcGlg\nYpfq/vwxYrIA6MslbXCxW0c=\n-----END PRIVATE KEY-----\n";
const GOOGLE_CLIENT_EMAIL = "dataroomtest@gen-lang-client-0794537551.iam.gserviceaccount.com"
const PARENT_FOLDER_ID = "1LYVZsp8a-1xqpOZ8ii2V1DLUSICAvtsM"

// Define folder structure
const folderStructure = {
  "All Evidence Documents": {
    "Authorship | Certificates": null,
    "Authorship Paper": null,
    "Awards": null,
    "Book": null,
    "Conference": null,
    "Critical Role | Employment": null,
    "Editorial Board Membership": null,
    "High Salary": null,
    "Judging": null,
    "Memberships": null,
    "Patent": null,
    "Peer Reviews": null,
    "Press Articles": null
  },
  "All Letters": null,
  "Employer Documents": null,
  "Personal Documents": null,
  "Press": null,
  "Resources": {
    "LOR Guide": null,
    "LOR Templates": null
  }
};

export const dataroomRouter = createTRPCRouter({
  createDataroom: protectedProcedure
    .input(dataroomInput)
    .mutation(async ({ ctx, input }) => {
      try {
        const auth = new google.auth.GoogleAuth({
          credentials: {
            client_email: GOOGLE_CLIENT_EMAIL,
            private_key: GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
          },
          scopes: ['https://www.googleapis.com/auth/drive.file'],
        });

        const drive = google.drive({ version: 'v3', auth });

        // Helper function to create folder and return its ID
        async function createFolder(name: string, parentId: string): Promise<string> {
          const folderMetadata = {
            name: name,
            mimeType: 'application/vnd.google-apps.folder',
            parents: [parentId],
          };

          const folder = await drive.files.create({
            requestBody: folderMetadata,
            fields: 'id',
          });

          if (!folder.data.id) {
            throw new Error(`Failed to create folder: ${name}`);
          }

          return folder.data.id;
        }

        // Recursive function to create folder structure
        async function createFolderStructure(structure: Record<string, any>, parentId: string) {
          for (const [folderName, subFolders] of Object.entries(structure)) {
            const newFolderId = await createFolder(folderName, parentId);
            if (subFolders !== null) {
              await createFolderStructure(subFolders, newFolderId);
            }
          }
        }

        // Check if root folder exists
        const existingFolder = await drive.files.list({
          q: `name='${input.name}' and mimeType='application/vnd.google-apps.folder' and '${PARENT_FOLDER_ID}' in parents and trashed=false`,
          fields: 'files(id, webViewLink)',
        });

        const files = existingFolder.data.files ?? [];
        
        if (files.length > 0) {
          const folderId = files[0]?.id ?? '';
          const folderLink = files[0]?.webViewLink ?? '';
          
          return {
            success: true,
            data: {
              folderId,
              folderLink,
            },
            message: "Folder already exists"
          };
        }

        // Create root folder
        const rootFolder = await drive.files.create({
          requestBody: {
            name: input.name,
            mimeType: 'application/vnd.google-apps.folder',
            parents: [PARENT_FOLDER_ID],
          },
          fields: 'id, webViewLink',
        });

        if (!rootFolder.data.id || !rootFolder.data.webViewLink) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to create root folder",
          });
        }

        // Create folder structure
        await createFolderStructure(folderStructure, rootFolder.data.id);

        // Set permissions for user
        await drive.permissions.create({
          fileId: rootFolder.data.id,
          requestBody: {
            type: 'user',
            role: 'reader',
            emailAddress: input.userEmail,
          },
          fields: 'id',
        });

        // Update user's dataRoomLink
        await ctx.db
          .update(users)
          .set({ dataRoomLink: rootFolder.data.webViewLink })
          .where(eq(users.userId, input.userId));

        return {
          success: true,
          data: {
            folderId: rootFolder.data.id,
            folderLink: rootFolder.data.webViewLink,
          },
          message: "Dataroom created successfully with full folder structure"
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create dataroom or update user",
          cause: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }),
});