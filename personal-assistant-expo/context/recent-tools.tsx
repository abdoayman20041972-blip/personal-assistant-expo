import { createContext, useCallback, useContext, useMemo, useState, type PropsWithChildren } from 'react';

type RecentToolsContextValue = {
  recentToolIds: string[];
  recordToolUse: (toolId: string) => void;
};

const RecentToolsContext = createContext<RecentToolsContextValue | null>(null);

export function RecentToolsProvider({ children }: PropsWithChildren) {
  const [recentToolIds, setRecentToolIds] = useState<string[]>([]);

  const recordToolUse = useCallback((toolId: string) => {
    setRecentToolIds((current) => [
      toolId,
      ...current.filter((id) => id !== toolId),
    ].slice(0, 5));
  }, []);

  const value = useMemo(
    () => ({ recentToolIds, recordToolUse }),
    [recentToolIds, recordToolUse],
  );

  return (
    <RecentToolsContext.Provider value={value}>
      {children}
    </RecentToolsContext.Provider>
  );
}

export function useRecentTools() {
  const value = useContext(RecentToolsContext);
  if (!value) {
    throw new Error('useRecentTools must be used inside RecentToolsProvider');
  }
  return value;
}
