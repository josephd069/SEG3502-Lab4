import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {UserInfoService} from '../user-info-service';

@Component({
  selector: 'app-user-result',
  imports: [RouterLink],
  templateUrl: './user-result.html',
  styleUrl: './user-result.css'
})
export class UserResult {
  private userInfoService: UserInfoService = inject(UserInfoService);
  userInfo = this.userInfoService.getUserInfo();
}
