export function isAuthPage(pathname) {
    const authPages = ["/mock-table","/owners","/welcome","/addparcel","/parcel"]; //ใส่routh ที่ต้องการแสดง nav และ sidebar
    return authPages.includes(pathname);//ถูกนำไปใช้ใน ClientLayout
  }