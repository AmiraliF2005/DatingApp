import { Component, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { Member } from '../../_models/member';
import { Account } from '../../_services/account';
import { Members } from '../../_services/members';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PhotoEditor } from "../photo-editor/photo-editor";

@Component({
  selector: 'app-member-edit',
  imports: [FormsModule, PhotoEditor],
  templateUrl: './member-edit.html',
  styleUrl: './member-edit.css'
})
export class MemberEdit implements OnInit {
  @ViewChild('editForm') editForm?: NgForm;
  @HostListener('window:beforeunload', ['$event']) notify($event: any) {
    if (this.editForm?.dirty) {
      $event.returnValue = true;
    }
  }

  member?: Member;
  private accountService = inject(Account);
  private memberService = inject(Members);
  private toastr = inject(ToastrService);

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    const user = this.accountService.currentUser();
    if (!user) return;
    this.memberService.getMember(user.username).subscribe({
      next: member => this.member = member
    })
  }

  updateMember() {
    this.memberService.updateMember(this.editForm?.value).subscribe({
      next: _ => {
        this.toastr.success('Profile updated successfuly');
        this.editForm?.reset(this.member);
      }
    })
  }

  onMemberChange(event : Member){
    this.member = event;
  }
}
