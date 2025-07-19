import { Component, inject, OnInit } from '@angular/core';
import { Members } from '../../_services/members';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../_models/member';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';

@Component({
  selector: 'app-member-detail',
  imports: [GalleryModule],
  templateUrl: './member-detail.html',
  styleUrl: './member-detail.css'
})
export class MemberDetail implements OnInit {
  private memberService = inject(Members);
  private rout = inject(ActivatedRoute);
  member? : Member;
  images : GalleryItem[] = [];

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember(){
    const username = this.rout.snapshot.paramMap.get('username');
    if(!username) return;
    this.memberService.getMember(username).subscribe({
      next: member => {
        this.member = member,
        member.photos.map(p=> {
          this.images.push(new ImageItem({src: p.url , thumb: p.url}))
        })
      }
    })
  }
}
