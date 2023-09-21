"use client";
import React, { useEffect } from "react";
import { Song } from "@/types";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import MediaItem from "@/components/MediaItem";
import LikeButton from "@/components/LikeButton";
import useOnPlay from "@/hooks/useOnPlay";
interface LikedContentProps {
  songs: Song[];
}
const LikedContent = ({ songs }: LikedContentProps) => {
  const { isLoading, user } = useUser();
  const onPlay = useOnPlay(songs);
  const router = useRouter();
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);
  if (songs.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No liked songs
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-y-2 w-full p-6">
      {songs.map((item) => (
        <div key={item.id} className="flex items-center gap-x-4 w-full">
          <div className="flex-1">
            <MediaItem data={item} onClick={(id: string) => onPlay(id)} />
          </div>
          <LikeButton songId={item.id} />
        </div>
      ))}
    </div>
  );
};

export default LikedContent;
