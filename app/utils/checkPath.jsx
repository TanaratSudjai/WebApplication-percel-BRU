export function isAuthPage(pathname) {
    const authPages = ["/login", "/mastersignup"];
    return authPages.includes(pathname);
  }