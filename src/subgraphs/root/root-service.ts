import { CreateHostInput, Host } from '../../generated/graphql-types';
import { UpdateDoc } from '../../utils/db-commands';
import { GetDocsFrom } from '../../utils/db-queries';

export class RootService {
  async getAllHosts(): Promise<Host[]> {
    const hosts = await GetDocsFrom<Host>((db) => db.collection('hosts'));
    return hosts;
  }

  async createHost(input: CreateHostInput): Promise<Host | undefined> {
    try {
      const newHost = { id: input.id, name: input.name } as Host;
      await UpdateDoc<Host>((db) => db.collection('hosts'), input.id, newHost);
      return newHost;
    } catch (error) {
      console.log(error);
    }
  }
}
