import { redirect } from "react-router-dom";

export function authMiddleware(shouldBeAuthorized: boolean, redirectUrl: string){
  const token = localStorage.getItem('@social');

  if(shouldBeAuthorized){
    if(!token) return redirect(redirectUrl);
    return true;
  } 

  if(token) return redirect(redirectUrl);
  return true;
}