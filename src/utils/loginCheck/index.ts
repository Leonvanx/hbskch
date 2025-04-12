export function isAuthenticated(): boolean {
  if (sessionStorage.getItem('token')) {
    return true;
  } else {
    return false;
  }
}
