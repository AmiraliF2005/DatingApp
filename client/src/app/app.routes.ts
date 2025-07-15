import { Routes } from '@angular/router';
import { Home } from './home/home';
import { MemberList } from './members/member-list/member-list';
import { MemberDetail } from './members/member-detail/member-detail';
import { Lists } from './lists/lists';
import { Messages } from './messages/messages';
import { authGuard } from './_guards/auth-guard';
import { TestErrors } from './erors/test-errors/test-errors';
import { ServerError } from './erors/server-error/server-error';
import { NotFound } from './erors/not-found/not-found';

export const routes: Routes = [
    { path: '', component: Home },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard],
        children: [
            { path: 'members', component: MemberList, canActivate: [authGuard] },
            { path: 'member/:id', component: MemberDetail },
            { path: 'lists', component: Lists },
            { path: 'messages', component: Messages },
        ]
    },
    { path: 'errors' , component: TestErrors},
    { path: 'not-found' , component: NotFound},
    { path: 'server-error' , component: ServerError},
    { path: '**', component: Home, pathMatch: 'full' }
];
