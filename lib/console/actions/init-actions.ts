// lib
import chalk from 'chalk';
import { inject, injectable } from 'inversify';

import { System, DI_TYPES as CORE_DI_TYPES } from 'fabrico';
import { DI_TYPES } from '../../commands/bootstrap/di-types';
import { InitCommand } from '../../commands/init/index';
import { Metadata, Target } from 'fabrico';

@injectable()
export class InitActions {

  constructor(@inject(CORE_DI_TYPES.System) private system: System, @inject(DI_TYPES.InitCommand) private initCommand: InitCommand) { }

  public async initialize(verbose: boolean, force: boolean, workingPath: string, version: string, answers: any): Promise<void> {
    const metaData = new Metadata();
    metaData.version = version || this.system.version;
    metaData.name = answers.name || 'fabrico-app';
    metaData.description = answers.description || 'This is a Fabrico app';
    metaData.author = answers.author || this.system.username;
    const t1 = new Target();
    t1.name = 'target 1';
    t1.path = 'target_1';
    metaData.targets = [ t1 ];
    await this.initCommand.initialize(verbose, force, workingPath, metaData);
  }

}
