'use client';

import { Button } from '~/app/lib/components/button';
import { toast } from '~/app/lib/components/toast/use-toast';
import { api } from '~/trpc/react';

export function FollowButton({
  followId,
  userId
}: {
  followId: string;
  userId: string;
}) {
  const apiUtils = api.useUtils();
  const { mutate: followMutation } = api.follow.follow.useMutation({
    onSuccess: () => {
      void apiUtils.follow.followers.invalidate({
        userId
      });
      void apiUtils.follow.following.invalidate({
        userId: followId
      });
      void apiUtils.follow.isFollowing.invalidate({
        follower: userId,
        following: followId
      });

      toast({
        title: 'Successfully followed user',
        color: 'green'
      });
    }
  });
  const { mutate: unfollowMutation } = api.follow.unfollow.useMutation({
    onSuccess: () => {
      void apiUtils.follow.followers.invalidate({
        userId
      });
      void apiUtils.follow.following.invalidate({
        userId: followId
      });
      void apiUtils.follow.isFollowing.invalidate({
        follower: userId,
        following: followId
      });

      toast({
        title: 'Successfully unfollowed user',
        color: 'green'
      });
    }
  });

  const { data: isFollowing } = api.follow.isFollowing.useQuery({
    follower: userId,
    following: followId
  });

  return (
    <>
      {isFollowing ? (
        <Button
          variant="outline"
          onClick={() =>
            unfollowMutation({
              follower: userId,
              following: followId
            })
          }
          className="bg-transparent text-white hover:bg-white hover:text-black"
          size="sm"
        >
          Following
        </Button>
      ) : (
        <Button
          variant="outline"
          onClick={() => {
            followMutation({
              follower: userId,
              following: followId
            });
          }}
          disabled={userId === followId || !userId}
          className="text-black hover:bg-transparent hover:text-white"
          size="sm"
        >
          Follow
        </Button>
      )}
    </>
  );
}
