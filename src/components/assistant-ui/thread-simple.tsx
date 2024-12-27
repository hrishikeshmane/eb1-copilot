"use client";

import {
  ComposerPrimitive,
  MessagePrimitive,
  ThreadPrimitive,
} from "@assistant-ui/react";
import type { FC } from "react";
import { Bot, SendHorizontalIcon } from "lucide-react";

import { TooltipIconButton } from "@/components/assistant-ui/tooltip-icon-button";
import { cn } from "@/lib/utils";

export const Thread: FC = () => {
  return (
    <ThreadPrimitive.Root className="h-full bg-background">
      <ThreadPrimitive.Viewport className="flex h-full flex-col items-center overflow-y-scroll scroll-smooth bg-inherit px-4 pt-8">
        <MyThreadWelcome />

        <ThreadPrimitive.Messages
          components={{
            UserMessage: MyUserMessage,
            AssistantMessage: MyAssistantMessage,
          }}
        />

        <div className="min-h-8 flex-grow" />

        <div className="sticky bottom-0 mt-3 flex w-full max-w-4xl flex-col items-center justify-end rounded-t-lg bg-inherit pb-4">
          <MyComposer />
        </div>
      </ThreadPrimitive.Viewport>
    </ThreadPrimitive.Root>
  );
};

const MyThreadWelcome: FC = () => {
  return (
    <ThreadPrimitive.Empty>
      <div className="flex flex-grow flex-col items-center justify-center">
        <BotAvatar />
        <p className="mt-4 font-medium">How can I help you today?</p>
      </div>
    </ThreadPrimitive.Empty>
  );
};

const MyComposer: FC = () => {
  return (
    <ComposerPrimitive.Root className="flex w-full flex-wrap items-end rounded-lg border bg-inherit px-2.5 shadow-sm transition-colors ease-in focus-within:border-aui-ring/20">
      <ComposerPrimitive.Input
        autoFocus
        placeholder="Write a message..."
        rows={1}
        className="size-full max-h-40 resize-none border-none bg-transparent p-4 pr-6 text-sm outline-none placeholder:text-muted-foreground focus:ring-0 disabled:cursor-not-allowed"
      />
      <ComposerPrimitive.Send asChild>
        <TooltipIconButton
          tooltip="Send"
          variant="default"
          className="my-2.5 size-8 p-2 transition-opacity ease-in"
        >
          <SendHorizontalIcon />
        </TooltipIconButton>
      </ComposerPrimitive.Send>
    </ComposerPrimitive.Root>
  );
};

const MyUserMessage: FC = () => {
  return (
    <MessagePrimitive.Root className="grid w-full max-w-4xl auto-rows-auto grid-cols-[minmax(72px,1fr)_auto] gap-y-2 py-4">
      <div className="col-start-2 row-start-1 max-w-xl break-words rounded-3xl bg-primary px-5 py-2.5 text-primary-foreground">
        <MessagePrimitive.Content />
      </div>
    </MessagePrimitive.Root>
  );
};

const MyAssistantMessage: FC = () => {
  return (
    <MessagePrimitive.Root className="relative grid w-full max-w-4xl grid-cols-[auto_1fr] grid-rows-[auto_1fr] py-4">
      <BotAvatar className="col-start-1 row-span-full row-start-1 mr-2 mt-1.5" />

      <div className="col-start-2 row-start-1 my-1.5 max-w-xl break-words rounded-3xl bg-muted px-5 py-2.5 leading-7 text-foreground">
        <MessagePrimitive.Content />
      </div>
    </MessagePrimitive.Root>
  );
};

const BotAvatar = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full bg-muted",
        className,
      )}
    >
      <Bot />
    </div>
  );
};
