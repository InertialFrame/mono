import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class UsersGuard implements CanActivate {
	canActivate(
		context: ExecutionContext
	): boolean | Promise<boolean> | Observable<boolean> {
		return true;
	}
}

//import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { GqlExecutionContext } from '@nestjs/graphql';
//
// @Injectable()
// export class UsersGuard implements CanActivate {
//   canActivate(context: ExecutionContext): boolean {
//     const ctx = GqlExecutionContext.create(context);
//     return true;
//   }
// }
