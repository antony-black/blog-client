export enum EPathPages {
  AUTH = "/auth",
  LAYOUT = "/",
  POSTS = "",
  CURRENT_POST = "posts/:id",
  FOLLOWERS = "/followers",
  FOLLOWING = "/following",
  USER_PROFILE = "/users/:id",
}

export enum EPathGlobal {
  CREATE_COMMENT = "/comments/create",
  REMOVE_COMMENT = "/comments/remove",
  FOLLOW = "/followers/follow",
  UNFOLLOW = "/followers/unfollow",
  ADD_LIKE = "/likes/add",
  REMOVE_LIKE = "/likes/remove",
  CREATE_POST = "/posts/create",
  ALL_POSTS = "/posts",
  SINGLE_POST = "/posts",
  REMOVE_POST = "/posts/remove",
  LOGIN = "/users/login",
  REGISTRATION = "/users/registration",
  EDIT_PROFILE = "/users/update",
  CURRENT_USER = "/users/current",
  SINGLE_USER = "/users",
}
