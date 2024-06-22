export function isAuthPage(pathname) {
    const authPages = ["/login", "/mastersignup","/404"];
    return authPages.includes(pathname);
  }