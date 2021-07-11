import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import * as Path from 'path';

@Module({
	imports: [
		GraphQLModule.forRoot({
			debug: true,
			playground: true,
			typePaths: ['./apps/nest-api/src/app/**/*.graphql'],
			definitions: {
				path: Path.join(process.cwd(), './apps/nest-api/src/app/graphql.ts'),
				outputAs: 'interface',
			},
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
