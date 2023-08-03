
export interface Tweet {
  content: string;
  id: number;
  published: string;
  user: TweetUser;
  attachment: any;
  img: string;
}

export interface TweetUser {
  active: boolean;
  email: string;
  id: number;
  username: string;
  join_date?: string;
}



export interface TimeLineApiResponse {
  count: number;
  timeline: Tweet[];
}
export interface MyTweetsApiResponse {
  count: number;
  my_tweets: Tweet[];
}
export interface MakeTweetApiResponse {
  message: string;
  tweet: Tweet;
}

export interface FollowApiResponse{
  resp: string;
}

export interface ProfileDetailApiResponse{
  count: number;
  my_tweets? : Tweet[];
  followings?: TweetUser[];
  followers?: TweetUser[];
}


export interface UserListApiResponse {
  count: number;
  users: TweetUser[];
  search_results : TweetUser[];
}
