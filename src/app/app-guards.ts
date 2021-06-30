import { map } from 'rxjs/operators';
import { User } from 'firebase';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

export const redirectLoggedInToInicio = () =>
    map((user: User) => {
        return user ? ['/dashboard'] : true;
    });

export const redirectVerified = () =>
    map((user: User) => {
        return user ? true : ['/login'];
    });

export const redirectOrVerifyEmail = () =>
    map((user: User) => {
        return user ? true : ['/login'];
    });

export const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/login']);
export const redirectLoggedInToSendEmail = () => redirectLoggedInTo(['/dashboard']);