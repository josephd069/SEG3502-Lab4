import { Injectable } from '@angular/core';

export interface UserInfo {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private userInfo: UserInfo | null = null;

  setUserInfo(userInfo: UserInfo): void {
    this.userInfo = userInfo;
  }

  getUserInfo(): UserInfo | null {
    return this.userInfo;
  }
}
