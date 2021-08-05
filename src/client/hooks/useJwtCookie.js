import React, { useEffect } from "react";

export default function useJwtCookie(value) {
  const [cookie, setCookie] = "";

  useEffect(() => {
    _checkCookie();
    const jwt =
      (document.cookie = `jwt=${value}; expires=Thu, 31 Dec 2100 12:00:00 UTC;`);
    setCookie(jwt);
  }, []);

  const _checkCookie = () => {
    const name = "jwt=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");
    console.log(ca);
  };

  return cookie;
}
