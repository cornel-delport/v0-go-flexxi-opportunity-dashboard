import { db } from '@/lib/firebase';
import { Source, SourceConfig } from '@/lib/types';

class SourceService {
  async getSources(): Promise<Source[]> {
    const snapshot = await db.collection('sources').get();
    return snapshot.docs.map(doc => doc.data() as Source);
  }

  async getSourceById(id: string): Promise<Source | null> {
    const doc = await db.collection('sources').doc(id).get();
    return doc.exists ? doc.data() as Source : null;
  }

  async createSource(config: SourceConfig): Promise<Source> {
    const source: Source = {
      id: db.collection('sources').doc().id,
      config,
      createdAt: new Date(),
      status: 'active',
      opportunitiesFound: 0,
      lastSync: null,
    };
    await db.collection('sources').doc(source.id).set(source);
    return source;
  }

  async updateSourceConfig(id: string, config: Partial<SourceConfig>): Promise<void> {
    await db.collection('sources').doc(id).update({ config });
  }
}

export const sourceService = new SourceService();
