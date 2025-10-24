import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  MEMBERS: 'members:list',
  HISTORY: 'history:list',
  STATS_HISTORY: 'stats:history'
} as const;

export type ActType = 'corto' | 'largo';
export type ActRecord = {
  id: string;
  dateISO: string;
  kind: ActType;
  presentIds: string[];
};

export type StatsSnapshot = {
  id: string;
  dateISO: string;
  totals: {
    [memberName: string]: { corto: number; largo: number; total: number };
  };
  totalsSummary: { corto: number; largo: number; general: number };
};

export async function getMembers(): Promise<{ id: string; name: string }[]> {
  const raw = await AsyncStorage.getItem(KEYS.MEMBERS);
  return raw ? JSON.parse(raw) : [];
}

export async function setMembers(list: { id: string; name: string }[]) {
  await AsyncStorage.setItem(KEYS.MEMBERS, JSON.stringify(list));
}

export async function getHistory(): Promise<ActRecord[]> {
  const raw = await AsyncStorage.getItem(KEYS.HISTORY);
  return raw ? JSON.parse(raw) : [];
}

export async function getStatsHistory(): Promise<StatsSnapshot[]> {
  const raw = await AsyncStorage.getItem(KEYS.STATS_HISTORY);
  return raw ? JSON.parse(raw) : [];
}

export async function addStatsSnapshot(snapshot: StatsSnapshot) {
  const list = await getStatsHistory();
  const updated = [snapshot, ...list].sort((a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime());
  await AsyncStorage.setItem(KEYS.STATS_HISTORY, JSON.stringify(updated));
  return updated;
}

export async function clearStatsHistory() {
  await AsyncStorage.setItem(KEYS.STATS_HISTORY, JSON.stringify([]));
}

function uuid() { return Math.random().toString(36).slice(2) + Date.now().toString(36); }

export async function addRecord(newRec: ActRecord) {
  const list = await getHistory();
  const sameDay = (a: string, b: string) => new Date(a).toDateString() === new Date(b).toDateString();
  const exists = list.some(r => r.kind === newRec.kind && sameDay(r.dateISO, newRec.dateISO));
  if (exists) return list;
  const updated = [newRec, ...list].sort((a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime());
  await AsyncStorage.setItem(KEYS.HISTORY, JSON.stringify(updated));

  try {
    const members = await getMembers();
    const byId: Record<string, string> = {};
    members.forEach(m => { byId[m.id] = m.name; });

    const map: Record<string, { corto: number; largo: number }> = {};
    members.forEach(m => (map[m.name] = { corto: 0, largo: 0 }));

    updated.forEach(r => {
      r.presentIds.forEach(pid => {
        const name = byId[pid];
        if (!name) return;
        if (r.kind === 'corto') map[name].corto += 1; else map[name].largo += 1;
      });
    });

    const totals: StatsSnapshot['totals'] = {};
    let tc = 0, tl = 0;
    Object.entries(map).forEach(([name, v]) => {
      totals[name] = { corto: v.corto, largo: v.largo, total: v.corto + v.largo };
      tc += v.corto; tl += v.largo;
    });

    const snapshot: StatsSnapshot = {
      id: uuid(),
      dateISO: new Date().toISOString(),
      totals,
      totalsSummary: { corto: tc, largo: tl, general: tc + tl }
    };
    await addStatsSnapshot(snapshot);
  } catch (e) {
    console.warn('Snapshot error:', e);
  }

  return updated;
}

export async function clearHistory() {
  await AsyncStorage.setItem(KEYS.HISTORY, JSON.stringify([]));
}
