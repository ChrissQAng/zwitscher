export function userToView(user) {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    _id: user._id,
    isEmailVerified: user.isEmailVerified,
  };
}
