import Image from 'next/image';

interface UserProfileProps {
  image?: string;
  name?: string;
  handle?: string;
}

export function UserProfile(props: UserProfileProps) {
  return (
    <div className="flex flex-row">
      <div className="relative h-10 w-10 mt-2 rounded-full border-streamingpurple border">
        {props.image && (
          <Image
            src={props.image}
            draggable={false}
            alt=""
            fill
            sizes="100% 100%"
            aria-label="movie poster"
            className="rounded-full"
          />
        )}
      </div>
      <div className="flex flex-col min-w-0">
        <div className="flex flex-row">
          <div className="pl-2">{props.name}</div>
          <div className="pl-1 text-gray-300/25">@{props.handle}</div>
        </div>
        <div className="p-2 bg-streamingpurple/20 rounded-lg m-1 border-streamingpurple block border w-72 line-clamp-3 overflow-hidden">
          <p className="text-white line-clamp-3">
            10/10 Movie NGL10/10 Movie NGL10/10 Movie NGL10/10 Movie NGL10/10
            Movie NGL10/10 Movie NGL10/10 Movie NGL10/10 Movie NGL10/10 Movie
            NGL10/10 Movie NGL10/10 Movie NGL10/10 Movie NGL10/10 Movie NGL10/10
            Movie NGL10/10 Movie NGL10/10 Movie NGL10/10 Movie NGL10/10 Movie
            NGL10/10 Movie NGL10/10 Movie NGL10/10 Movie NGL10/10 Movie NGL10/10
            Movie NGL10/10 Movie NGL10/10 Movie NGL10/10 Movie NGL10/10 Movie
            NGL10/10 Movie NGL10/10 Movie NGL10/10 Movie NGL10/10 Movie NGL10/10
            Movie NGL10/10 Movie NGL10/10 Movie NGL10/10 Movie NGL10/10 Movie
            NGL10/10 Movie NGL10/10 Movie NGL10/10 Movie NGL10/10 Movie NGL10/10
            Movie NGL10/10 Movie NGL10/10 Movie NGL10/10 Movie NGL10/10 Movie
            NGL10/10 Movie NGL10/10 Movie NGL10/10 Movie NGL10/10 Movie NGL10/10
            Movie NGL10/10 Movie NGL10/10 Movie NGL10/10 Movie NGL10/10 Movie
            NGL10/10 Movie NGL10/10 Movie NGL10/10 Movie NGL10/10 Movie NGL10/10
            Movie NGL10/10 Movie NGL10/10 Movie NGL10/10 Movie NGL10/10 Movie
            NGL
          </p>
        </div>
      </div>
    </div>
  );
}
