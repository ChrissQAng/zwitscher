export function userToView(user) {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    tweetsId: user.tweetsId,
    commentsId: user.commentsId,
  };
}
